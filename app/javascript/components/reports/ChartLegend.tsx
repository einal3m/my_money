import React from 'react'

import { LineSeriesData } from 'types/models'

type ChartLegendProps = {
  seriesData: LineSeriesData[]
}

const ChartLegend = (props: ChartLegendProps) => {
  const renderLegendItems = () => {
    let style
    return props.seriesData?.map((series, i) => {
      style = {
        borderTop: `2px solid ${series.backgroundColour}`,
        borderLeft: `2px solid ${series.backgroundColour}`,
      }
      return (
        <div key={i} className="legend-item" style={style}>
          {series.name}
        </div>
      )
    })
  }

  const renderLegend = () => {
    return (
      <div className="chart-legend" style={{ top: '30px', right: '0px' }}>
        <div className="legend-items">{renderLegendItems()}</div>
      </div>
    )
  }

  return <div style={{ position: 'relative' }}>{renderLegend()}</div>
}

export default ChartLegend
