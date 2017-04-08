import React, {Component, PropTypes} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Paper from 'material-ui/Paper'

import FilterList from 'material-ui/svg-icons/content/filter-list'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NavigateRight from 'material-ui/svg-icons/image/navigate-next'
import NavigateLeft from 'material-ui/svg-icons/image/navigate-before'

import Model from './model'
import injectProp from './utils/injectProp'
import {hasHtml, extractHtml} from './utils/handleHtmlProp'
import {hasCustomRender, callCustomRender} from './utils/handleCustomRender'
import {DEFAULT_PER_PAGE} from './constants'

const iconStyleFilter = {
  color: '#757575',
  cursor: 'pointer',
  transform: 'translateY(5px) translateX(-20px)'
}

const searchHeaderColumnStyle = {
  position: 'relative',
  textAlign: 'right'
}

const searchStyle = {
  color: '#777777',
  opacity: 0,
  transitionDuration: '0.6s',
  transitionProperty: 'opacity',
  border: 0,
  outline: 0,
  fontSize: 16,
  width: '100%',
  marginLeft: -22,
  padding: '7px 12px',
  textIndent: 3,
  cursor: 'text'
}

const iconStyleSearch = {
  color: '#757575',
  position: 'absolute',
  top: '30%',
  opacity: 0,
  marginLeft: -76
}

const navigationStyle = {
  cursor: 'pointer'
}

const defaultFetchKey = ({id}) => id

export default class MuiDataTable extends Component {
  constructor(props, ...rest) {
    super(props, ...rest)
    this.initModel(props.data)
    const {data: tableData, pageInfo} = this.model.page(1)

    this.state = {
      disabled: true,
      style: searchStyle,
      perPageSelection: props.paginated.rowsPerPage || DEFAULT_PER_PAGE,
      searchData: [],
      tableData,
      pageInfo,
      isSearching: false,
      navigationStyle,
      iconStyleSearch,
      currentPage: 1,
      checked: []
    }

    this.columns = injectProp(props.columns)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handlePerPageChange = this.handlePerPageChange.bind(this)
    this.navigateRight = this.navigateRight.bind(this)
    this.navigateLeft = this.navigateLeft.bind(this)
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
      this.model.removeListener('change', this.handleModelChange)
      this.model.removeListener('checked', this.handleCheckedChange)
    }
  }

  handleModelChange = () => {
    this.setPage(1)
  }

  handleCheckedChange = (checked) => {
    const {onSelectedChange} = this.props
    if (onSelectedChange) {
      onSelectedChange(checked)
    }
    this.setState(() => ({
      checked
    }))
  }

  handleRowChecked = (checked) => {
    this.model.setCheckeds(checked)
  }

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

  handlePerPageChange(evt, index, val) {
    this.model.setPerPages(val)
  }

  paginationObject() {
    return this.state.pageInfo
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.initModel(nextProps.data)
      this.setPage(1)
    }
  }

  showPaginationInfo() {
    return this.paginationObject().currentlyShowing
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

  navigateRight() {
    const paginationInfo = this.paginationObject()

    this.setPage(paginationInfo.nextPage)
  }

  navigateLeft() {
    const paginationInfo = this.paginationObject()

    this.setPage(paginationInfo.previousPage)
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

  populateTableWithdata(data, cols) {
    const properties = cols.map(item => item.property)
    const {fetchKey} = this.props
    const {checked} = this.state

    return data.map((item, index) => {
      const key = fetchKey(item)
      return (
        <TableRow
          selected={ checked.includes(key) }
          key={ key }>
          {this.mapDataToProperties(properties, item)}
        </TableRow>
      )
    })
  }

  calcColSpan(cols) {
    return cols.length
  }

  shouldShowItem(item) {
    const styleObj = {
      display: item ? '' : 'none'
    }

    return styleObj
  }

  shouldShowMenu(defaultStyle) {
    if (
      this.props.paginated &&
      typeof this.props.paginated === 'boolean'
    ) { return defaultStyle }

    const menuOptions = this.props.paginated.menuOptions

    return menuOptions ? defaultStyle : {display: 'none'}
  }

  toggleOpacity(val) {
    return val === 0 ? 1 : 0
  }

  toggleSearch() {
    const style = {...this.state.style}
    const searchIconStyle = {...this.state.iconStyleSearch}
    let disabledState = this.state.disabled

    style.opacity = this.toggleOpacity(style.opacity)
    searchIconStyle.opacity = this.toggleOpacity(searchIconStyle.opacity)

    disabledState = !disabledState

    this.setState({
      style,
      iconStyleSearch: searchIconStyle,
      disabled: disabledState
    })
  }

  searchData(e) {
    const word = e.target.value
    this.model.setFilter(word)
  }

  renderTableData(obj, prop) {
    const columns = this.columns

    if (hasCustomRender(prop, columns)) {
      return callCustomRender(prop, columns, obj)
    } else if (obj[prop] && hasHtml(prop, columns)) {
      return (
        <div>
          {obj[prop]}
          {extractHtml(prop, columns)}
        </div>
      )
    } else if (!obj[prop] && hasHtml(prop, columns)) {
      return extractHtml(prop, columns)
    } else if (obj[prop] && !hasHtml(prop, columns)) {
      return obj[prop]
    }

    return undefined
  }

  setRowSelection(type, obj) {
    const menuOptions = type === 'object' ? obj.menuOptions : [5, 10, 15]

    return menuOptions.map((num, index) => (
      <MenuItem value={ num } primaryText={ num } key={ index } />
    ))
  }

  handleRowSelection(obj) {
    if (obj && obj.constructor === Boolean) {
      return this.setRowSelection('', obj)
    } else if (obj && obj.constructor === Object) {
      return this.setRowSelection('object', obj)
    } else {

    }
  }

  render() {
    const {multiSelectable} = this.props
    return (
      <Paper zDepth={ 1 }>
        <Table
          onRowSelection={ this.handleRowChecked }
          multiSelectable={ multiSelectable } >
          <TableHeader>
            <TableRow style={ this.shouldShowItem(this.props.search) }>
              <TableHeaderColumn
                colSpan={ this.calcColSpan(this.columns) }
                style={ searchHeaderColumnStyle }>
                <SearchIcon style={ this.state.iconStyleSearch } />
                <input
                  type='search'
                  placeholder='Search'
                  style={ this.state.style }
                  disabled={ this.state.disabled }
                  onKeyUp={ this.searchData } />
                <FilterList
                  style={ iconStyleFilter }
                  onClick={ this.toggleSearch } />
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              {this.mapColumnsToElems(this.columns)}
            </TableRow>
          </TableHeader>

          <TableBody showRowHover>
            {this.populateTableWithdata(this.state.tableData, this.columns)}
          </TableBody>

          <TableFooter style={ this.shouldShowItem(this.props.paginated) }>
            <TableRow>
              <TableRowColumn
                style={ {
                  textAlign: 'right',
                  verticalAlign: 'middle',
                  width: '70%'
                } }>
                <span style={ this.shouldShowMenu({paddingRight: 15}) }>
                  Rows per page:
                </span>
                <SelectField
                  value={ this.state.perPageSelection }
                  style={ this.shouldShowMenu({width: 35, fontSize: 13, top: 0}) }
                  onChange={ this.handlePerPageChange }>
                  {this.handleRowSelection(this.props.paginated)}
                </SelectField>
              </TableRowColumn>

              <TableRowColumn
                style={ {textAlign: 'right', verticalAlign: 'middle'} }>
                <span> {this.showPaginationInfo()} </span>
              </TableRowColumn>

              <TableRowColumn
                style={ {textAlign: 'right', verticalAlign: 'middle'} }>
                <NavigateLeft
                  onClick={ this.navigateLeft }
                  style={ this.state.navigationStyle } />
                <NavigateRight
                  onClick={ this.navigateRight }
                  style={ this.state.navigationStyle } />
              </TableRowColumn>
            </TableRow>
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
    paginated: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired,
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
  }
}
