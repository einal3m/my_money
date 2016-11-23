import lineChart from '../line-chart';

describe('barChart', () => {
  let svg;
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    container.id = 'd3-chart';
    document.body.appendChild(container);

    const seriesData = [
      { name: 'Actual',
        data: [[new Date('2016-08-01'), 400], [new Date('2016-08-24'), 2300], [new Date('2016-08-31'), -1000]],
        backgroundColour: 'blue',
      },
      { name: 'Budget',
        data: [[new Date('2016-08-02'), 300], [new Date('2016-08-12'), 500], [new Date('2016-08-30'), -600]],
        backgroundColour: 'red',
      },
    ];

    const chartOptions = {
      height: 350,
      width: 500,
    };

    const showTooltipSpy = jasmine.createSpy('showTooltipSpy');
    const hideTooltipSpy = jasmine.createSpy('hideTooltipSpy');
    const formatMoneySpy = jasmine.createSpy('formatMoneySpy');
    const formatDateSpy = jasmine.createSpy('formatDateSpy');

    const chartCallbacks = {
      showTooltip: showTooltipSpy,
      hideTooltip: hideTooltipSpy,
      formatYLabels: formatMoneySpy,
      formatXLabels: formatDateSpy,
    };

    lineChart(
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

  it('renders focus circles', () => {
    const hover = svg.childNodes[4];
    expect(hover.className.baseVal).toEqual('focus');
  });

  it('renders an overlay rectangle', () => {
    const overlay = svg.childNodes[5];
    expect(overlay.className.baseVal).toEqual('overlay');
  });

  it('renders an axis at zero y', () => {
    const zeroAxis = svg.childNodes[6];
    expect(zeroAxis.className.baseVal).toEqual('y-axis-zero');
  });
});
