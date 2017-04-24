import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Markdown from 'remarkable'
import {highlightString} from 'lib/highlight'

const options = {
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

const md = new Markdown(options)
md.inline.ruler.enable(['mark'])

md.renderer.rules.mark_open = () => '<span style="color: red">'
md.renderer.rules.mark_close = () => '</span>'

class Remarkable extends Component {
  content () {
    if (this.props.source) {
      return (
        <span
          dangerouslySetInnerHTML={{__html: md.render(this.props.source)}} />
      )
    }

    return React.Children.map(this.props.children, child => {
      if (typeof child === 'string') {
        return <span dangerouslySetInnerHTML={{__html: md.render(child)}} />
      } else {
        return child
      }
    })
  }

  render () {
    return (
      <div>
        {this.content()}
      </div>
    )
  }

  static propTypes = {
    source: PropTypes.string,
    children: PropTypes.node
  }
}

export default Remarkable
