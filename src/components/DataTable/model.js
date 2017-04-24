import min from 'lodash/min'
import memoize from 'lodash/memoize'
import EventEmitter from 'events'
import search from './utils/search'
import {DEFAULT_PER_PAGE, DEFAULT_CONFIG} from './constants'

class Model extends EventEmitter {
  constructor (config) {
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
    this.prevFilter = ''
  }

  setFilter (filter) {
    const {search: key} = this
    this._setData(
      search({
        key,
        filter,
        data: filter.length > this.prevFilter.length
          ? this.data
          : this.originalData
      })
    )
    this.prevFilter = filter
  }

  setChecked (key, checked) {
    this.checked[checked ? 'add' : 'delete'](key)
    this._emitChecked()
  }

  idToKey (idx) {
    const datas = this.pageData(this.currentPage)
    return this.fetchKey(datas[idx])
  }

  setAllChecked () {
    const keys = this.data.map(this.fetchKey)
    this.checked = new Set(keys)
    this._emitChecked()
  }

  setPageChecked () {
    const datas = this.pageData(this.currentPage)
    datas.forEach(data => {
      this.checked.add(this.fetchKey(data))
    })
    this._emitChecked()
  }

  setPerPages (n) {
    this.perPage = n
    this._emitChange()
  }

  page (n) {
    this.currentPage = n
    return {
      data: new Set(this.pageData(n).map(this.fetchKey)),
      pageInfo: this._pageInfo(n)
    }
  }

  pageData = memoize(n => {
    if (!this.paginated) {
      return this.data
    }

    const data = this.data.slice((n - 1) * this.perPage, n * this.perPage)
    return data
  })

  _pageInfo (n) {
    return {
      currentPage: n,
      nextPage: n === this.totalPages ? null : n + 1,
      previousPage: n - 1 === 0 ? null : n - 1,
      showing: this._calcShowing(n),
      isLastPage: n === this.totalPages,
      totalPages: this.totalPages,
      total: this.data.length
    }
  }

  _calcShowing (n) {
    const start = (n - 1) * this.perPage + 1
    const end = min([n * this.perPage, this.data.length])
    return `${start} - ${end} of ${this.totalPages}`
  }

  _setData (data) {
    this.data = data
    this._emitChange()
  }

  _emitChecked () {
    this.emit('checked', this.checked)
  }

  _emitChange () {
    this.currentPage = 1
    this.totalPages = this.paginated
      ? Math.floor(this.data.length / this.perPage)
      : 1
    this.pageData.cache.clear()
    this.emit('change')
  }
}

export default Model
