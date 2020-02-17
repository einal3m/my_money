import barChart from '../bar-chart';

describe('barChart', () => {
  let svg;
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    container.id = 'd3-chart';
    document.body.appendChild(container);

    const seriesData = [
      { name: 'Actual', data: [400, 2300, -1000, -1005, -2345], backgroundColour: '#61ABDB', borderColor: 'maroon' },
      { name: 'Last Year', data: [4300, 2300, 1000, -1500, -2345], backgroundColour: '#FDCA3A', borderColor: 'maroon' },
    ];

    const xAxisLabels = ['Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15'];

    const chartOptions = {
      height: 350,
      width: 500,
    };

    const showTooltipSpy = jasmine.createSpy('showTooltipSpy');
    const hideTooltipSpy = jasmine.createSpy('hideTooltipSpy');
    const formatMoneySpy = jasmine.createSpy('formatMoneySpy');

    const chartCallbacks = {
      showTooltip: showTooltipSpy,
      hideTooltip: hideTooltipSpy,
      formatYLabels: formatMoneySpy,
    };

    barChart(
      xAxisLabels,
      seriesData,
      '#d3-chart',
      chartOptions,
      chartCallbacks
    );

    svg = container.firstChild;
  });

  afterAll(() => {
    document.body.removeChild(container);
  });

  it('renders an svg element', () => {
    expect(svg.tagName).toEqual('svg');
    expect(svg.clientHeight).toEqual(350);
    expect(svg.clientWidth).toEqual(500);
  });

  it('renders a y-axis', () => {
    const yAxis = svg.childNodes[0];
    expect(yAxis.className.baseVal).toEqual('y-axis');
  });

  it('renders a x-axis', () => {
    const xAxis = svg.childNodes[1];
    expect(xAxis.className.baseVal).toEqual('x-axis');
  });

  it('renders series 0', () => {
    const series0 = svg.childNodes[2];
    expect(series0.className.baseVal).toEqual('series0');
  });

  it('renders series 1', () => {
    const series1 = svg.childNodes[3];
    expect(series1.className.baseVal).toEqual('series1');
  });

  it('renders hover boxes', () => {
    const hover = svg.childNodes[4];
    expect(hover.className.baseVal).toEqual('hover');
  });

  it('renders an axis at zero y', () => {
    const zeroAxis = svg.childNodes[5];
    expect(zeroAxis.className.baseVal).toEqual('y-axis-zero');
  });
});
