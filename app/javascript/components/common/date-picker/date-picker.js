import React, { PropTypes } from 'react';
import moment from 'moment';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import DatePickerPopover from './date-picker-popover';
import { DATE_PICKER_DAY_MODE, DISPLAY_FORMAT, OUTPUT_FORMAT, PARSE_FORMATS } from './date-picker-constants';

require('../../../../css/date-picker.scss');

export default class DatePicker extends React.Component {

  constructor(props) {
    super();

    let viewDate = moment(props.value);
    let displayDate = '';
    if (!viewDate.isValid()) {
      viewDate = moment();
    } else {
      displayDate = viewDate.format(DISPLAY_FORMAT);
    }

    this.state = {
      viewMode: DATE_PICKER_DAY_MODE,
      displayDate,
      viewDate,
    };
  }

  onChangeHandler = (event) => {
    this.setState({ displayDate: event.target.value });
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      let viewDate = moment(nextProps.value);
      let displayDate = '';
      if (!viewDate.isValid()) {
        viewDate = moment();
      } else {
        displayDate = viewDate.format(DISPLAY_FORMAT);
      }
      this.setState({ displayDate, viewDate });
    }
  }

  renderAddOn(popover) {
    const addOn = (
      <div className="input-group-addon">
        <i className="fa fa-calendar" />
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
    const CalendarPopover = (props) => {
      const style = props.style;
      style.left += -50;
      return (
        <Popover {...props} arrowOffsetLeft="80%" style={style} />
      );
    };

    const popover = (
      <CalendarPopover id="date-picker">
        <DatePickerPopover
          viewMode={this.state.viewMode}
          viewDate={this.state.viewDate}
          handlePrevious={this.handlePrevious}
          handleNext={this.handleNext}
          setView={this.setView}
          setDate={this.setDate}
          closePicker={this.closePicker}
        />
      </CalendarPopover>
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
  value: React.PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
