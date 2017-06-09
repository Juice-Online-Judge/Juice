import {css} from 'glamor'
import {hsl, hsla} from 'polished'

export const rowStyle = css({
  borderBottom: `1px solid ${hsl(0, 0, 88)}`,
  color: hsla(0, 0, 0, 0.88),
  height: '48px'
})
