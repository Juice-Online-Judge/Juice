import glamorous from 'glamorous'
import {hsl} from 'polished'

const Table = glamorous.table({
  backgroundColor: hsl(0, 0, 1),
  borderCollapse: 'collapse',
  borderSpacing: 0,
  fontFamily: 'Roboto, sans-serif',
  tableLayout: 'fixed',
  width: '100%'
})

export default Table
