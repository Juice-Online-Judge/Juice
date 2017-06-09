import glamorous from 'glamorous'
import {hsl} from 'polished'

const TableHeader = glamorous.thead({
  borderBottom: `1px solid ${hsl(0, 0, 0.878)}`
})

export default TableHeader
