import React, { useState } from 'react'

import lineChart from './d3/LineChart'
import { numberFormatWithSign } from 'util/moneyUtil'
import dateUtil from 'util/date-util'
import ChartTooltip, { TooltipData } from './ChartTooltip'
import ChartLegend from './ChartLegend'
import { useD3 } from 'hooks/useD3'
import { LineSeriesData } from 'types/models'

type D3LineChartProps = {
  seriesData: LineSeriesData[]
}

const D3LineChart = (props: D3LineChartProps) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const chartCallbacks = {
    showTooltip: (newTooltipData: TooltipData) => {
      setTooltipData(newTooltipData)
      setShowTooltip(true)
    },
    hideTooltip: () => {
      setShowTooltip(false)
      setTooltipData(null)
    },
    formatYLabels: (amount: number) => numberFormatWithSign(amount),
    formatXLabels: (date: Date) => dateUtil.chartFormat(date),
  }

  const chartOptions = {
    height: 450,
  }

  const ref = useD3(
    (d3Container: any) => {
      if (props && d3Container) {
        lineChart(props.seriesData, d3Container, chartOptions, chartCallbacks)
      }
    },
    [props],
  )

  return (
    <div className="chart-container">
      <ChartTooltip show={showTooltip} tooltipData={tooltipData} />
      <ChartLegend seriesData={props.seriesData} />
      <svg width="100%" height={`${chartOptions.height}px`} ref={ref} />
    </div>
  )
}

export default D3LineChart
