import React from 'react';
import { Link } from 'react-router';

export class NotFoundView extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <h1>404 Not found</h1>
        <hr />
        <Link to='/'>Back To Index</Link>
      </div>
    );
  }
}

export default NotFoundView;
