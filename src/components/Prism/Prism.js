import React, { PropTypes } from 'react'
import setStatic from 'recompose/setStatic'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import isNil from 'lodash/isNil'
import { highlightReact } from 'lib/highlight'

export const Prism = compose(
  setDisplayName('Prism'),
  setPropTypes({
    lang: PropTypes.oneOf(['c', 'cpp', 'txt']),
    code: PropTypes.string,
    children: PropTypes.node
  }),
  setStatic('defaultProps', {
    lang: 'c'
  })
)((props) => {
  const code = isNil(props.code) ? props.children : props.code
  const { lang } = props
  return (
    <pre className={ `language-${lang}` }>
      <code className={ `language-${lang}` }>
        { highlightReact(code, lang) }
      </code>
    </pre>
  )
})

export default Prism
