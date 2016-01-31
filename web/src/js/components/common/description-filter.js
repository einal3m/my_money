'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';

export default class DescriptionFilter extends React.Component {
  onBlur(event) {
    this.props.onChange(event.target.value);
  }

  onKeyPress(event) {
    if (event.which == 13) {
      this.props.onChange(event.target.value);
    }    
  }

  render() {
    return (
      <div className="row">
        <div className="form-horizontal col-xs-4">
          <Input type="text" label="Search Text" defaultValue={this.props.description} labelClassName="col-xs-4" 
                 wrapperClassName="col-xs-8" onBlur={this.onBlur.bind(this)} onKeyPress={this.onKeyPress.bind(this)} ref='descriptionInput'>
          </Input>
        </div>
      </div>      
    );
  }
}
