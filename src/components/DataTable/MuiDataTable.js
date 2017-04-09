import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
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

  handleRowChecked = checked => {
    if (checked === 'all') {
      this.model.setAllChecked()
    }
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
    return cols.map((item, index) => (
      <TableHeaderColumn key={ index }>{item.title}</TableHeaderColumn>
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
    const {checked} = this.state

    return data.map((item, index) => {
      const key = fetchKey(item)
      return (
        <TableRow selected={ checked.includes(key) } key={ key }>
          {this.mapDataToProperties(properties, item)}
        </TableRow>
      )
    })
  }

  calcColSpan(cols) {
    return cols.length
  }

  searchData = (e) => {
    const word = e.target.value
    this.model.setFilter(word)
  }

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
          <TableHeader>
            {
              search && (
                <SearchBar
                  onChange={ this.searchData }
                  columnLength={ this.calcColSpan(this.columns) } />
              )
            }
            <TableRow>
              {this.mapColumnsToElems(this.columns)}
            </TableRow>
          </TableHeader>

          <TableBody showRowHover>
            {this.populateTableWithData(this.state.tableData, this.columns)}
          </TableBody>

          {paginated && (
            <DataTableFooter
              pageInfo={ pageInfo }
              perPages={ perPages }
              paginated={ paginated }
              onPerPageChange={ this.handlePerPageChange }
              onNavigateLeft={ this.navigateLeft }
              onNavigateRight={ this.navigateRight } />
          )}

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
