import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import { ReportViewButtonsComponent as ReportViewButtons } from '../report-view-buttons';

describe('ReportViewButtons', () => {
  it('renders two toggle buttons with table active', () => {
    const buttons = shallowRenderer(<ReportViewButtons viewType="chart" />);
    expect(buttons.props.className).toEqual('btn-group');

    const [chart, table] = buttons.props.children;
    expect(chart.type).toEqual('button');
    expect(chart.props.className).toMatch(/active/);
    expect(chart.props.children.props.className).toMatch(/chart/);
    expect(table.type).toEqual('button');
    expect(table.props.className).not.toMatch(/active/);
    expect(table.props.children.props.className).toMatch(/table/);
  });

  it('renders two toggle buttons with chart active', () => {
    const buttons = shallowRenderer(<ReportViewButtons viewType="table" />);
    expect(buttons.props.className).toEqual('btn-group');

    const [chart, table] = buttons.props.children;
    expect(chart.type).toEqual('button');
    expect(chart.props.className).not.toMatch(/active/);
    expect(table.type).toEqual('button');
    expect(table.props.className).toMatch(/active/);
  });
});
