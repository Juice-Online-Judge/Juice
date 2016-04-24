import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import liftcycle from 'recompose/lifecycle';
import omitProps from './omitProps';
import compose from 'recompose/compose';
import { createIsAdminSelector } from 'redux/modules/account';

const redirectNotAdmin = (WrappedComponent) => {
  const isAdminSelector = createIsAdminSelector();
  const EnhancedComponent = compose(
    connect((state) => ({ admin: isAdminSelector(state) }), { replace }),
    setDisplayName(wrapDisplayName('redirectNotAdmin', WrappedComponent)),
    liftcycle((component) => {
      const { admin, replace } = component.props;
      if (!admin) {
        replace('/permission-denied');
      }
    }),
    omitProps(['admin', 'replace'])
  )(WrappedComponent);
  return EnhancedComponent;
};

export default redirectNotAdmin;
