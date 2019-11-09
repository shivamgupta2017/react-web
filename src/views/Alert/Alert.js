import { UncontrolledAlert } from 'reactstrap';
import React from 'react';

export default class Alert extends React {

  constructor() { }
  render() {
    return (
      <UncontrolledAlert color="info">
        I am an alert and I can be dismissed!
    </UncontrolledAlert>
    );
  }
}