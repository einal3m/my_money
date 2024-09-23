import React, { CSSProperties } from 'react'

export type TooltipData = {
  tooltipPosition: 'right' | 'left'
  periodLabel: string
  seriesLabel: string[]
  values: string[]
  colours: string[]
}

type ChartTooltipProps = {
  show: boolean
  tooltipData: TooltipData | null
}

const ChartTooltip = (props: ChartTooltipProps) => {
  const renderTooltipItems = () => {
    return props.tooltipData?.seriesLabel.map((label, i) => (
      <div key={i} className="tooltip-item">
        <span
          className="tooltip-icon"
          style={{ color: props.tooltipData?.colours[i] }}
        >
          <i className="fa fa-circle" />
        </span>
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{props.tooltipData?.values[i]}</span>
      </div>
    ))
  }

  const tooltipStyle = () => {
    const style: CSSProperties = { top: '40px' }
    if (props.tooltipData?.tooltipPosition === 'right') {
      style.right = '120px';
    } else {
      style.left = '100px';
    }
    return style
  }

  const renderTooltip = () => {
    if (props.show) {
      return (
        <div className="chart-tooltip" style={tooltipStyle()}>
          <div className="tooltip-title" data-testid="tooltip-title">
            {props.tooltipData?.periodLabel}
          </div>
          <div className="tooltip-items">{renderTooltipItems()}</div>
        </div>
      )
    }
    return undefined
  }

  return <div style={{ position: 'relative' }}>{renderTooltip()}</div>
}

export default ChartTooltip
