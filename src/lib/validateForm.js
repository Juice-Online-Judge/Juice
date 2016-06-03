import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import getDisplayName from 'recompose/getDisplayName';
import compose from 'recompose/compose';
import {
  createGetComponentMessage,
  validateForm,
  setValidationName,
  setValidationRule,
  clearValidationMessage
} from 'redux/modules/validate';

const validateFormHoc = (validateRule) => (WrappedComponent) => {
  const componentName = getDisplayName(WrappedComponent);
  const getComponentMessage = createGetComponentMessage(componentName);
  const mapStates = (state) => getComponentMessage(state);

  return compose(
    connect(mapStates, {
      validateForm,
      clearValidationMessage,
      setValidationName,
      setValidationRule
    }),
    lifecycle({
      componentWillMount() {
        this.props.clearValidationMessage(componentName);
        this.props.setValidationName(componentName);
        this.props.setValidationRule(validateRule);
      },
      componentWillUnmount() {
        this.props.setValidationName(null);
        this.props.setValidationRule({});
      }
    }),
    withHandlers({
      validateForm: (props) => (fields, cb) =>
        props.validateForm(fields, cb)
    }),
    setDisplayName(wrapDisplayName(WrappedComponent, 'Validate'))
  )(WrappedComponent);
};

export default validateFormHoc;
