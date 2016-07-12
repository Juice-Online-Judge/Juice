import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import setDisplayName from 'recompose/setDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'
import omitProps from './omitProps'

export const redirectComponent = (name, mapStateToProp, shouldRedirectPath, options) =>
  (WrappedComponent) => {
    var omitPropsName = ['replace']
    const actions = options.actions ? { ...options.actions, replace } : { replace }
    const redirectComponentHoc = lifecycle({
      componentWillMount() {
        this.checkRedirect(this.props)
      },
      componentWillReceiveProps(nextProps) {
        this.checkRedirect(nextProps)
      },
      checkRedirect(props) {
        const { replace } = props
        const redirectPath = shouldRedirectPath(props)

        if (options.cleanUp) {
          options.cleanUp(props)
        }

        if (redirectPath) {
          replace(redirectPath)
        }
      }
    })

    if (options.omitProps) {
      omitPropsName = omitPropsName.concat(options.omitProps)
    }

    return compose(
      connect(mapStateToProp, actions),
      setDisplayName(wrapDisplayName(WrappedComponent, name)),
      redirectComponentHoc,
      omitProps(omitPropsName)
    )(WrappedComponent)
  }

export default redirectComponent
