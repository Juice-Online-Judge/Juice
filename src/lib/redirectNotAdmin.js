import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import lifecycle from 'recompose/lifecycle';
import omitProps from './omitProps';
import compose from 'recompose/compose';
import { isNotAdminSelector } from 'redux/modules/account';

const redirectNotAdmin = (WrappedComponent) => {
  const redirectNotAdminHoc = lifecycle({
    componentWillMount() {
      this.checkRedirect(this.props);
    },
    componentWillReceiveProps(nextProps) {
      this.checkRedirect(nextProps);
    },
    checkRedirect(props) {
      const { isNotAdmin, replace } = props;
      console.log('IsNotAdmin', isNotAdmin);
      if (isNotAdmin) {
        console.log('Do replace');
        replace('/permission-denied');
      }
    }
  });

  const EnhancedComponent = compose(
    connect((state) => ({
      isNotAdmin: isNotAdminSelector(state)
    }), { replace }),
    setDisplayName(wrapDisplayName(WrappedComponent, 'redirectNotAdmin')),
    redirectNotAdminHoc,
    omitProps(['admin', 'valid', 'replace'])
  )(WrappedComponent);
  return EnhancedComponent;
};

export default redirectNotAdmin;
