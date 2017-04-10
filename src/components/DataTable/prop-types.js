import PropTypes from 'prop-types'

export const paginatedShape = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.shape({
    rowsPerPage: PropTypes.number,
    menuOptions: PropTypes.arrayOf(PropTypes.number)
  })
]).isRequired

export const pageInfoShape = PropTypes.shape({
  currentPage: PropTypes.number.isRequired,
  nextPage: PropTypes.number,
  previousPage: PropTypes.number,
  showing: PropTypes.string.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}).isRequired

export default {
  paginatedShape,
  pageInfoShape
}
