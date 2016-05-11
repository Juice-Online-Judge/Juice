import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createElement from 'recompose/createElement';
import omitProps from './omitProps';
import compose from 'recompose/compose';
import { createIsAdminSelector, isValidSelector } from 'redux/modules/account';

const redirectNotAdmin = (WrappedComponent) => {
  const isAdminSelector = createIsAdminSelector();

  const redirectNotAdminHoc = (WrappedComponent) => {
    return class extends Component {
      componentWillMount() {
        this.checkRedirect(this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.checkRedirect(nextProps);
      }

      checkRedirect(props) {
        const { valid, admin, replace } = props;
        if (valid && !admin) {
          replace('/permission-denied');
        }
      }

      render() {
        return createElement(WrappedComponent, this.props);
      }

      static propTypes = {
        valid: PropTypes.bool.isRequired,
        admin: PropTypes.bool.isRequired,
        replace: PropTypes.func.isRequired
      };
    };
  };

  const EnhancedComponent = compose(
    connect((state) => ({
      admin: isAdminSelector(state),
      valid: isValidSelector(state)
    }), { replace }),
    setDisplayName(wrapDisplayName(WrappedComponent, 'redirectNotAdmin')),
    redirectNotAdminHoc,
    omitProps(['admin', 'valid', 'replace'])
  )(WrappedComponent);
  return EnhancedComponent;
};

export default redirectNotAdmin;
