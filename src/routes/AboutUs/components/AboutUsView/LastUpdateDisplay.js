import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import parse from 'date-fns/parse'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const fetchLastCommit = async project => {
  const {data: ref} = await axios.get(
    `https://api.github.com/repos/Juice-Online-Judge/${project}/git/refs/heads/master`
  )
  const {data: commit} = await axios.get(ref.object.url)
  return {
    hash: commit.sha.substr(0, 7),
    url: commit.html_url,
    author: commit.author.name,
    date: distanceInWordsToNow(parse(commit.author.date))
  }
}

class LastUpdateDisplay extends Component {
  async componentDidMount () {
    const {project} = this.props
    const log = await fetchLastCommit(project)
    this.setState({log})
  }

  render () {
    const {log} = this.state

    return (
      <span style={styles.marginLeft}>
        Last update:
        {log
          ? <span>
            <a href={log.url}> {log.hash} </a> from {log.date} ago by{' '}
            {log.author}
          </span>
          : 'fetching'}
      </span>
    )
  }

  static propTypes = {
    project: PropTypes.string.isRequired
  }

  state = {
    log: null
  }
}

export default LastUpdateDisplay

const styles = {
  marginLeft: {
    marginLeft: '3px'
  }
}
