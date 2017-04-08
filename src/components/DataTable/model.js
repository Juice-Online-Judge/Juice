import min from 'lodash/min'
import memoize from 'lodash/memoize'
import EventEmitter from 'events'
import search from './utils/search'
import {DEFAULT_PER_PAGE} from './constants'

const DEFAULT_CONFIG = {paginated: false, data: [], search: ''}

class Model extends EventEmitter {
  constructor(config) {
    super()
    const {paginated, data, search, fetchKey} = {...DEFAULT_CONFIG, ...config}
    this.originalData = data
    this.paginated = paginated
    this.perPage = paginated.rowsPerPage || DEFAULT_PER_PAGE
    this.currentPage = 1
    this.totalPages = 0
    this.search = search
    this._setData(data)
    this.fetchKey = fetchKey
    this.checked = new Set()
  }

  setFilter(filter) {
    const {search: key} = this
    this._setData(search(key, filter, this.originalData))
  }

  setChecked(idx, checked) {
    const {data: datas} = this.pageData(this.currentPage)
    const key = this.fetchKey(datas[idx])
    this.checked[checked ? 'add' : 'delete'](key)
    this._emitChecked()
  }

  setCheckeds(idxs) {
    const {data: datas} = this.pageData(this.currentPage)
    datas.forEach(data => {
      this.checked.delete(this.fetchKey(data))
    })
    idxs.forEach(idx => {
      this.checked.add(this.fetchKey(datas[idx]))
    })
    this._emitChecked()
  }

  setPerPages(n) {
    this.perPage = n
    this._emitChange()
  }

  page(n) {
    this.currentPage = n
    return this.pageData(n)
  }

  pageData = memoize(n => {
    if (!this.paginated) {
      return {
        data: this.data,
        pageInfo: this._pageInfo(1)
      }
    }

    const data = this.data.slice((n - 1) * this.perPage, n * this.perPage)
    return {
      data,
      pageInfo: this._pageInfo(n)
    }
  });

  _pageInfo(n) {
    return {
      currentPage: n,
      nextPage: n === this.totalPages ? null : n + 1,
      previousPage: n - 1 === 0 ? null : n - 1,
      currentlyShowing: this._calcShowing(n),
      isLastPage: n === this.totalPages,
      totalNumOfPages: this.totalPages,
      total: this.data.length
    }
  }

  _calcShowing(n) {
    const start = (n - 1) * this.perPage + 1
    const end = min([n * this.perPage, this.data.length])
    return `${start} - ${end} of ${this.totalPages}`
  }

  _setData(data) {
    this.data = data
    this._emitChange()
  }

  _emitChecked() {
    this.emit('checked', Array.from(this.checked).sort())
  }

  _emitChange() {
    this.currentPage = 1
    this.totalPages = this.paginated
      ? Math.floor(this.data.length / this.perPage)
      : 1
    this.pageData.cache.clear()
    this.emit('change')
  }
}

export default Model
