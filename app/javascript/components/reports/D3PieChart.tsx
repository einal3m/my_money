import React from 'react'

import pieChart from './d3/PieChart'
import { useD3 } from '../../hooks/useD3'
import { PieChartData } from 'types/models'

const D3PieChart = ({ data, labels }: PieChartData) => {
  const options = {
    height: 450,
    width: 450,
  }

  const ref = useD3(
    (d3Container) => {
      if (data && d3Container) {
        pieChart(data, labels, d3Container, options)
      }
    },
    [data],
  )

  if (data.length == 0) {
    return <svg width={`${options.width}px`} height={`${options.height}px`} />
  }

  return (
    <div className="chart-container">
      <svg
        width={`${options.width}px`}
        height={`${options.height}px`}
        ref={ref}
        role="img"
      />
    </div>
  )
}

export default D3PieChart
