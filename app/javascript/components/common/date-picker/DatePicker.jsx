import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import DatePickerPopover from './DatePickerPopover';
import { DATE_PICKER_DAY_MODE, DISPLAY_FORMAT, OUTPUT_FORMAT, PARSE_FORMATS } from './DatePickerConstants';

import '../../../stylesheets/date-picker.scss';

export default class DatePicker extends React.Component {

  constructor(props) {
    super();

    this.state = this.defaultState(props.value);
  }

  defaultState = (value) => {
    let viewDate = moment(value);
    let displayDate = '';
    if (!viewDate.isValid()) {
      viewDate = moment();
    } else {
      displayDate = viewDate.format(DISPLAY_FORMAT);
    }

    return {
      viewMode: DATE_PICKER_DAY_MODE,
      displayDate,
      viewDate,
      prevPropsValue: value
    };
  };

  onChangeHandler = (event) => {
    // no-op makes this component read only
  };

  onBlurHandler = () => {
    const date = moment(this.state.displayDate, PARSE_FORMATS);
    if (date.isValid()) {
      this.setState({ displayDate: date.format(DISPLAY_FORMAT), viewDate: date });
      this.props.onChange(date.format(OUTPUT_FORMAT));
    } else {
      this.props.onChange(null);
    }
  };

  handleNext = (duration, key) => {
    const viewDate = moment(this.state.viewDate);
    viewDate.add(duration, key);
    this.setState({ viewDate });
  };

  handlePrevious = (duration, key) => {
    const viewDate = moment(this.state.viewDate);
    viewDate.subtract(duration, key);
    this.setState({ viewDate });
  };

  setDate = (date) => {
    const viewDate = moment(this.state.viewDate);
    viewDate.set(date);
    this.setState({ viewDate });
  };

  setView = (viewMode) => {
    this.setState({ viewMode });
  };

  closePicker = (date) => {
    this.props.onChange(this.state.viewDate.set(date).format(OUTPUT_FORMAT));
    this.setState({ displayDate: this.state.viewDate.format(DISPLAY_FORMAT) });
    this.inputField.click();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevPropsValue) {
      let viewDate = moment(props.value);
      let displayDate = '';
      if (!viewDate.isValid()) {
        viewDate = moment();
      } else {
        displayDate = viewDate.format(DISPLAY_FORMAT);
      }

      return {
        viewMode: DATE_PICKER_DAY_MODE,
        displayDate,
        viewDate,
        prevPropsValue: props.value
      };
    }
    return null;
  }

  renderAddOn(popover) {
    const addOn = (
      <div className="input-group-prepend">
        <div className="input-group-text" data-testid="date-picker-icon">
          <i className="fa fa-calendar" />
        </div>
      </div>
    );

    if (this.props.disabled) return addOn;

    return (
      <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={popover}>
        {addOn}
      </OverlayTrigger>
    );
  }

  render() {
    const popover = (
      <Popover id="date-picker">
        <Popover.Content>
          <DatePickerPopover
            viewMode={this.state.viewMode}
            viewDate={this.state.viewDate}
            handlePrevious={this.handlePrevious}
            handleNext={this.handleNext}
            setView={this.setView}
            setDate={this.setDate}
            closePicker={this.closePicker}
          />
        </Popover.Content>
      </Popover>
    );

    return (
      <div className="input-group date-picker">
        <input
          id={this.props.name}
          className="form-control"
          name={this.props.name}
          type="text"
          value={this.state.displayDate}
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          disabled={this.props.disabled}
          ref={(c) => { this.inputField = c; }}
        />
        {this.renderAddOn(popover)}
      </div>
    );
  }
}

DatePicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
