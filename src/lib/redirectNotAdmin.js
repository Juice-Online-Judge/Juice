import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import doOnReceiveProps from 'recompose/doOnReceiveProps';
import omitProps from './omitProps';
import compose from 'recompose/compose';
import { createIsAdminSelector, isValidSelector } from 'redux/modules/account';

const redirectNotAdmin = (WrappedComponent) => {
  const isAdminSelector = createIsAdminSelector();
  const EnhancedComponent = compose(
    connect((state) => ({
      admin: isAdminSelector(state),
      valid: isValidSelector(state)
    }), { replace }),
    setDisplayName(wrapDisplayName(WrappedComponent, 'redirectNotAdmin')),
    doOnReceiveProps(({ admin, valid, replace }) => {
      if (valid && !admin) {
        replace('/permission-denied');
      }
    }),
    omitProps(['admin', 'valid', 'replace'])
  )(WrappedComponent);
  return EnhancedComponent;
};

export default redirectNotAdmin;
