import React from 'react'
import Remarkable from './Remarkable'
import {highlightString} from 'lib/highlight'
import setDisplayName from 'recompose/setDisplayName'

const remarkableOpts = {
  langPrefix: 'language-',
  highlight (str, lang) {
    if (lang) {
      if (lang === 'txt' || lang === 'plain') {
        return ''
      }

      return highlightString(str, lang)
    }

    return ''
  }
}

const Markdown = setDisplayName('Markdown')(props => {
  const {children, ...rest} = props

  if (children) {
    return (
      <span className='markdown-body'>
        <Remarkable {...rest} options={remarkableOpts}>
          {children}
        </Remarkable>
      </span>
    )
  }

  return (
    <span className='markdown-body'>
      <Remarkable {...rest} options={remarkableOpts} />
    </span>
  )
})

export default Markdown
