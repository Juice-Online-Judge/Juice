import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  static propTypes = {
    loginState: PropTypes.object.isRequired
  };

  get welcome() {
    let { loginState } = this.props;
    if (loginState.get('valid')) {
      if (loginState.get('state')) {
        return (
          <h1>
            Welcome user: { loginState.getIn(['user', 'username']) }
          </h1>
        );
      } else {
        return (
          <h1>
            Please login
          </h1>
        );
      }
    } else {
      return (
        <h1>
          Loading...
        </h1>
      );
    }
  }

  render() {
    return (
      <div>
        { this.welcome }
      </div>
    );
  }
}

export default connect((state) => {
  return { loginState: state.auth };
})(HomeView);
