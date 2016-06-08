import React from 'react'
import Remarkable from 'react-remarkable'
import hljs from 'highlight.js'
import setDisplayName from 'recompose/setDisplayName'

const remarkableOpts = {
  langPrefix: 'hljs language-',
  highlight(str, lang) {
    if (lang) {
      if (lang === 'txt' || lang === 'plain') {
        return ''
      }

      if (hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (err) {}
      }
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {}

    return ''
  }
}

const Markdown = setDisplayName('Markdown')((props) => {
  const { children, ...rest } = props

  if (children) {
    return (
      <span className='markdown-body'>
        <Remarkable { ...rest } options={ remarkableOpts } >
          { children }
        </Remarkable>
      </span>
    )
  }

  return (
    <span className='markdown-body'>
      <Remarkable { ...rest } options={ remarkableOpts } />
    </span>
  )
})

export default Markdown
