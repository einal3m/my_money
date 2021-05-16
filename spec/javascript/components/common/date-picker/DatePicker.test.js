import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import DatePicker from 'components/common/date-picker/DatePicker';

describe('DatePicker', () => {
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  test('a disabled date picker shows the date and cant be clicked', () => {
    render(
      <DatePicker
        name="my-date-picker"
        value="2021-05-31"
        onChange={onChangeSpy}
        disabled
      />
    );

    // the date is formatted
    expect(screen.getByDisplayValue('31-May-2021')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-icon')).toBeInTheDocument();

    // disabled datepickers don't pop up the datepicker popover
    fireEvent.click(screen.getByTestId('date-picker-icon'));
    expect(screen.queryByText('May 2021')).not.toBeInTheDocument();
  });

  test('selecting a date from the next month', async () => {
    render(
      <DatePicker
        name="my-date-picker"
        value="2021-05-31"
        onChange={onChangeSpy}
        disabled={false}
      />
    );

    const CURRENT_MONTH_CLASS = 'btn btn-link';
    const OTHER_MONTH_CLASS = 'btn btn-link text-muted';

    // the date is formatted
    expect(screen.getByDisplayValue('31-May-2021')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-icon')).toBeInTheDocument();

    // clicking the date picker opens the popover
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-icon'));
    });

    // the left and right arrows are displayed
    expect(screen.getByTestId('date-picker-left')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-right')).toBeInTheDocument();

    // month and days of week are displayed
    expect(screen.getByText('May 2021')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
    expect(screen.getByText('Tu')).toBeInTheDocument();
    expect(screen.getByText('We')).toBeInTheDocument();
    expect(screen.getByText('Th')).toBeInTheDocument();
    expect(screen.getByText('Fr')).toBeInTheDocument();
    expect(screen.getByText('Sa')).toBeInTheDocument();
    expect(screen.getByText('Su')).toBeInTheDocument();

    // there are two 1s, one for this month, one for the next month
    const ones = screen.getAllByText('1');
    expect(ones[0].className).toEqual(CURRENT_MONTH_CLASS)
    expect(ones[1].className).toEqual(OTHER_MONTH_CLASS)
    expect(screen.getByText('31')).toBeInTheDocument();

    // go to the next month
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-right'));
    });
    expect(screen.getByText('June 2021')).toBeInTheDocument();
    expect(screen.getAllByText('1').length).toEqual(2);
    expect(screen.getAllByText('30').length).toEqual(2);
    expect(screen.getByText('31').className).toEqual(OTHER_MONTH_CLASS);

    act(() => {
      fireEvent.click(screen.getByText('13'));
    })

    expect(onChangeSpy).toHaveBeenCalledWith('2021-06-13');
  });

  test('selecting a date from the previous year', async () => {
    render(
      <DatePicker
        name="my-date-picker"
        value="2021-05-31"
        onChange={onChangeSpy}
        disabled={false}
      />
    );

    // open the popover
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-icon'));
    });

    // click the month
    act(() => {
      fireEvent.click(screen.getByText('May 2021'));
    });

    // All the months are displayed
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
    expect(screen.getByText('Mar')).toBeInTheDocument();
    expect(screen.getByText('Apr')).toBeInTheDocument();
    expect(screen.getByText('May')).toBeInTheDocument();
    expect(screen.getByText('Jun')).toBeInTheDocument();
    expect(screen.getByText('Jul')).toBeInTheDocument();
    expect(screen.getByText('Aug')).toBeInTheDocument();
    expect(screen.getByText('Sep')).toBeInTheDocument();
    expect(screen.getByText('Oct')).toBeInTheDocument();
    expect(screen.getByText('Nov')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();

    // go to the previous year
    expect(screen.getByText('2021')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-left'));
    });
    expect(screen.getByText('2020')).toBeInTheDocument();

    // click on december
    act(() => {
      fireEvent.click(screen.getByText('Dec'));
    });
    expect(screen.getByText('December 2020')).toBeInTheDocument();

    // click on 19
    act(() => {
      fireEvent.click(screen.getByText('19'));
    });
    expect(onChangeSpy).toHaveBeenCalledWith('2020-12-19');
  });

  test('selecting a date from the next decade', async () => {
    render(
      <DatePicker
        name="my-date-picker"
        value="2021-05-31"
        onChange={onChangeSpy}
        disabled={false}
      />
    );

    // open the popover
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-icon'));
    });

    // click the month
    act(() => {
      fireEvent.click(screen.getByText('May 2021'));
    });

    // click the year
    act(() => {
      fireEvent.click(screen.getByText('2021'));
    });

    expect(screen.getByText('2020 - 2029')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('2027')).toBeInTheDocument();
    expect(screen.getByText('2028')).toBeInTheDocument();
    expect(screen.getByText('2029')).toBeInTheDocument();
    expect(screen.getByText('2030')).toBeInTheDocument();

    // click the next decade
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-right'));
    });

    expect(screen.getByText('2030 - 2039')).toBeInTheDocument();
    expect(screen.getByText('2029')).toBeInTheDocument();
    expect(screen.getByText('2040')).toBeInTheDocument();

    // select the year
    act(() => {
      fireEvent.click(screen.getByText('2035'));
    });

    // select the month
    act(() => {
      fireEvent.click(screen.getByText('Aug'));
    });

    // click on 5
    act(() => {
      fireEvent.click(screen.getByText('5'));
    });
    expect(onChangeSpy).toHaveBeenCalledWith('2035-08-05');
  });
});
