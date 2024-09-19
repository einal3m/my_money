import React, { useState } from 'react';
import PropTypes from 'prop-types';
import lineChart from './d3/LineChart';
import { numberFormatWithSign } from 'util/moneyUtil';
import dateUtil from '../../util/date-util';
import ChartTooltip from './ChartTooltip';
import ChartLegend from './ChartLegend';
import { useD3 } from '../../hooks/useD3';

const D3LineChart = (props) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const chartCallbacks = {
    showTooltip: (newTooltipData) => {setTooltipData(newTooltipData); setShowTooltip(true)},
    hideTooltip: () => {setShowTooltip(false); setTooltipData(null)},
    formatYLabels: (amount) => numberFormatWithSign(amount),
    formatXLabels: (date) => dateUtil.chartFormat(date),
  };

  const chartOptions = {
    height: 450,
  };

  const ref = useD3(
    (d3Container) => {
        if (props.chartData && d3Container) {
          lineChart(
            props.chartData.seriesData,
            d3Container,
            chartOptions,
            chartCallbacks
          );
        }
    },
    [props.data]
  )

  return (
    <div className="chart-container">
      <ChartTooltip show={showTooltip} tooltipData={tooltipData} chartWidth={1000} />
      <ChartLegend chartData={props.chartData} />
      <svg width="100%" height={`${chartOptions.height}px`} ref={ref} />
    </div>
  );
}

D3LineChart.propTypes = {
  chartData: PropTypes.shape({
    seriesData: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default D3LineChart;
