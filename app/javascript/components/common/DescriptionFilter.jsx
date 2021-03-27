import React from 'react';
import PropTypes from 'prop-types';

export default class DescriptionFilter extends React.Component {
  onBlur = (event) => {
    this.props.onChange(event.target.value);
  };

  onKeyPress = (event) => {
    if (event.which === 13) {
      this.props.onChange(event.target.value);
    }
  };

  render() {
    return (
      <div className="description-filter">
        <label htmlFor="bank" className="control-label">Search Text</label>
        <input
          className="form-control col-xs-8"
          name="bank"
          ype="text"
          defaultValue={this.props.description}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

DescriptionFilter.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
