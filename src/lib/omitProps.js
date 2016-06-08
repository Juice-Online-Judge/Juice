import mapProps from 'recompose/mapProps'
import compose from 'recompose/compose'
import omit from 'lodash/fp/omit'

const omitProps = compose(mapProps, omit)

export default omitProps
