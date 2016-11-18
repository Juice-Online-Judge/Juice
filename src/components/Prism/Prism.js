import React, { PropTypes } from 'react'
import setStatic from 'recompose/setStatic'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import isNil from 'lodash/isNil'
import classNames from 'classnames'
import { highlightReact } from 'lib/highlight'
import LineNumbers from './LineNumbers'
import './linenumber.scss'

export const Prism = compose(
  setDisplayName('Prism'),
  setPropTypes({
    lang: PropTypes.oneOf(['c', 'cpp', 'txt']),
    code: PropTypes.string,
    linenumber: PropTypes.bool.isRequired,
    children: PropTypes.node
  }),
  setStatic('defaultProps', {
    lang: 'c',
    linenumber: false
  })
)((props) => {
  const code = isNil(props.code) ? props.children : props.code
  const { lang } = props
  const langClass = `language-${lang}`
  return (
    <pre className={ classNames(langClass, { 'line-numbers': props.linenumber }) }>
      <code className={ langClass }>
        { highlightReact(code, lang) }
        { props.linenumber && <LineNumbers code={ code } /> }
      </code>
    </pre>
  )
})

export default Prism
