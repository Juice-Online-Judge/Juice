import React, { PropTypes } from 'react'
import Highlight from 'react-highlight'
import setStatic from 'recompose/setStatic'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'

export const CodePane = compose(
  setDisplayName('CodePane'),
  setPropTypes({
    lang: PropTypes.oneOf(['c', 'cpp', 'txt']),
    code: PropTypes.string,
    children: PropTypes.node
  }),
  setStatic('defaultProps', {
    lang: 'c'
  })
)((props) => {
  const code = props.code || props.children || ''
  const { lang } = props
  const className = `language-${lang}`
  return (
    <Highlight className={ className } >
      { code }
    </Highlight>
  )
})

export default CodePane
