import React, {Component} from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableFooter,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import Paper from 'material-ui/Paper'

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
      disabled: true,
      perPages: props.paginated.rowsPerPage || DEFAULT_PER_PAGE,
      searchData: [],
      tableData,
      pageInfo,
      isSearching: false,
      currentPage: 1,
      checked: []
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
  };

  handleSelectAll = () => {
    this.model.setAllChecked()
  };

  handleRowChecked = checked => {
    this.model.setCheckeds(checked)
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
      <TableHeaderColumn key={ item.property }>{item.title}</TableHeaderColumn>
    ))
  }

  mapDataToProperties(properties, obj) {
    return properties.map((prop, index) => (
      <TableRowColumn key={ index }>
        {this.renderTableData(obj, prop)}
      </TableRowColumn>
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
        <TableRow
          style={ this.calcShow(show) }
          selected={ checked.includes(key) }
          key={ key }>
          {show && this.mapDataToProperties(properties, item)}
        </TableRow>
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
    const {multiSelectable, search, paginated} = this.props
    const {pageInfo, perPages} = this.state
    return (
      <Paper zDepth={ 1 }>
        <Table
          onRowSelection={ this.handleRowChecked }
          multiSelectable={ multiSelectable }>
          <TableHeader
            displaySelectAll={ false }
            enableSelectAll={ false } >
            <SearchBar
              search={ !!search }
              onChange={ this.searchData }
              onSelectAll={ this.handleSelectAll }
              columnLength={ this.calcColSpan(this.columns) } />
            <TableRow>
              {this.mapColumnsToElems(this.columns)}
            </TableRow>
          </TableHeader>

          <TableBody showRowHover preScanRows={ false } deselectOnClickaway={ false }>
            {this.populateTableWithData(this.props.data, this.columns)}
          </TableBody>
          <TableFooter>
            {paginated && (
              <DataTableFooter
                pageInfo={ pageInfo }
                perPages={ perPages }
                paginated={ paginated }
                onPerPageChange={ this.handlePerPageChange }
                onNavigateLeft={ this.navigateLeft }
                onNavigateRight={ this.navigateRight } />
            )}
          </TableFooter>
        </Table>
      </Paper>
    )
  }

  static propTypes = {
    columns: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    multiSelectable: PropTypes.bool.isRequired,
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
