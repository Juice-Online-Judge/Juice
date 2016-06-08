import React, { PropTypes, Component } from 'react'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  get content() {
    return (
      <Router
        history={ this.props.history }
        routes={ this.props.routes }
        render={ applyRouterMiddleware(useScroll()) } />
    )
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <div style={ { height: '100%' } }>
          { this.content }
        </div>
      </Provider>
    )
  }
}
