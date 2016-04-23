import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCode, fetchSubmission } from 'redux/modules/submission';
import Inset from 'layouts/Inset';
import CodePane from 'components/CodePane';

class CodeView extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchSubmission(id);
    this.props.fetchCode(id);
  }

  render() {
    const { id } = this.props.params;
    const code = this.props.submission.get('code');
    const lang = this.props.submission.getIn(['entities', 'submission', `${id}`, 'language']);
    return (
      <Inset>
        <CodePane code={ code } lang={ lang } />
      </Inset>
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    fetchCode: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ submission: state.submission }),
  { fetchCode, fetchSubmission })(CodeView);
