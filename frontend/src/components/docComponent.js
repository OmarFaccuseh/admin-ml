import React, { Component } from 'react';

export default class DocComponent extends Component {
  state = {
  };

  render() {
    return (
      <React.Fragment>
        <label for="nombreInput" class="form-label"> Nombre </label>
        <input type="text" class="form-control" id="nombreInput"/>

      </React.Fragment>
    );
  }
}
