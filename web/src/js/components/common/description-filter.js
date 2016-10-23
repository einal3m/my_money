import React from 'react';

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
          <div className="form-group">
            <label className='col-xs-4'>Search Text</label>
            <input className='form-control col-xs-8' name='bank' type='text' defaultValue={this.props.description}
                   onBlur={this.onBlur.bind(this)} onKeyPress={this.onKeyPress.bind(this)} ref='descriptionInput'/>
          </div>
        </div>
      </div>      
    );
  }
}
