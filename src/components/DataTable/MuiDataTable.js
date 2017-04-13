import React, {Component} from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import Table from './Table/Table'
import TableHeader from './Table/TableHeader'
import HeaderRow from './Table/HeaderRow'
import HeaderColumn from './Table/HeaderColumn'
import Row from './Table/Row'
import Column from './Table/Column'

import SearchBar from './SearchBar'
import DataTableFooter from './DataTableFooter'

import Model from './model'
import {DEFAULT_PER_PAGE} from './constants'
import {paginatedShape} from './prop-types'
import injectProp from './utils/injectProp'
import {hasCustomRender, callCustomRender} from './utils/handleCustomRender'
import styles from 'lib/styles'

const defaultFetchKey = ({id}) => id

export default class MuiDataTable extends Component {
  constructor(props, ...rest) {
    super(props, ...rest)
    this.initModel(props.data)
    const {data: tableData, pageInfo} = this.model.page(1)

    this.state = {
      allChecked: false,
      perPages: props.paginated.rowsPerPage || DEFAULT_PER_PAGE,
      tableData,
      pageInfo,
      currentPage: 1,
      checked: new Set()
    }

    this.columns = injectProp(props.columns)
  }

  componentWillUmount() {
    this.removeListeners()
  }

  addListeners() {
    this.model.addListener('change', this.handleModelChange)
    this.model.addListener('checked', this.handleCheckedChange)
  }

  removeListeners() {
    if (this.model) {
      this.model.removeAllListeners()
    }
  }

  handleModelChange = () => {
    this.setPage(1)
  };

  handleCheckedChange = checked => {
    const {onSelectedChange} = this.props
    if (onSelectedChange) {
      onSelectedChange(checked)
    }
    this.setState(() => ({
      checked
    }))
    this.setState(({tableData, checked}) => ({
      allChecked: Array.from(tableData).every((key) => checked.has(key))
    }))
  };

  handleSelectAll = () => {
    this.model.setAllChecked()
  };

  handleSelect = (key, checked) => {
    this.model.setChecked(key, checked)
  };

  initModel(data) {
    const {paginated, search, fetchKey} = this.props
    this.removeListeners()
    this.model = new Model({
      paginated,
      data,
      search,
      fetchKey
    })
    this.addListeners()
  }

  handlePerPageChange = (evt, index, val) => {
    this.model.setPerPages(val)
    this.setState(() => ({
      perPages: val
    }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.initModel(nextProps.data)
      this.setPage(1)
    }
  }

  setPage(n) {
    if (!n) {
      return
    }

    this.setState(() => {
      const {data: tableData, pageInfo} = this.model.page(n)
      return {
        currentPage: n,
        tableData,
        pageInfo
      }
    })
  }

  navigateRight = () => {
    const {pageInfo} = this.state

    this.setPage(pageInfo.nextPage)
  }

  navigateLeft = () => {
    const {pageInfo} = this.state

    this.setPage(pageInfo.previousPage)
  }

  mapColumnsToElems(cols) {
    return cols.map((item) => (
      <HeaderColumn key={ item.property }>{item.title}</HeaderColumn>
    ))
  }

  mapDataToProperties(properties, obj) {
    return properties.map((prop, index) => (
      <Column key={ index }>
        {this.renderTableData(obj, prop)}
      </Column>
    ))
  }

  populateTableWithData(data, cols) {
    const properties = cols.map(item => item.property)
    const {fetchKey} = this.props
    const {checked, tableData} = this.state

    return data.map((item) => {
      const key = fetchKey(item)
      const show = tableData.has(key)
      return (
        <Row
          style={ this.calcShow(show) }
          selected={ checked.has(key) }
          onSelect={ this.handleSelect }
          id={ key }
          key={ key }>
          {show && this.mapDataToProperties(properties, item)}
        </Row>
      )
    })
  }

  calcShow(cond) {
    return cond
      ? null
      : styles.hidden
  }

  calcColSpan(cols) {
    return cols.length
  }

  searchData = (e) => {
    const word = e.target.value
    this.setFilter(word)
  }

  setFilter = debounce((word) => {
    this.model.setFilter(word)
  }, 300)

  renderTableData(obj, prop) {
    const columns = this.columns

    if (hasCustomRender(prop, columns)) {
      return callCustomRender(prop, columns, obj)
    } else if (obj[prop]) {
      return obj[prop]
    }

    return undefined
  }

  render() {
    const {search, paginated} = this.props
    const {pageInfo, perPages} = this.state
    return (
      <Paper zDepth={ 1 }>
        <Table>
          <TableHeader>
            <SearchBar
              search={ !!search }
              onChange={ this.searchData }
              columnLength={ this.calcColSpan(this.columns) } />
            <HeaderRow displaySelectAll>
              {this.mapColumnsToElems(this.columns)}
            </HeaderRow>
          </TableHeader>

          <tbody>
            {this.populateTableWithData(this.props.data, this.columns)}
          </tbody>
          <tfoot>
            {paginated && (
              <DataTableFooter
                pageInfo={ pageInfo }
                perPages={ perPages }
                paginated={ paginated }
                onPerPageChange={ this.handlePerPageChange }
                onNavigateLeft={ this.navigateLeft }
                onNavigateRight={ this.navigateRight } />
            )}
          </tfoot>
        </Table>
      </Paper>
    )
  }

  static propTypes = {
    columns: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    paginated: paginatedShape,
    fetchKey: PropTypes.func.isRequired,
    onSelectedChange: PropTypes.func
  };

  static defaultProps = {
    columns: [],
    data: [],
    paginated: false,
    multiSelectable: false,
    search: '',
    fetchKey: defaultFetchKey
  };
}
