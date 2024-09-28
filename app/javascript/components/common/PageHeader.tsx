import React, { ReactNode, useState } from 'react'
import Sticky from 'react-sticky-el'

import '../../stylesheets/common.scss'

type PageHeaderProps = {
  isLoading: boolean
  errorString: string | undefined
  title: string
  children?: ReactNode
}

const PageHeader = (props: PageHeaderProps) => {
  const [showError, setShowError] = useState(true)

  const renderStatus = () => {
    if (props.isLoading) {
      return <i className="fa-solid fa-spinner fa-xl fa-spin"></i>
    }

    if (props.errorString && showError) {
      return (
        <span className="error">
          Error: {props.errorString}
          <i
            className="fa fa-times-circle click-me"
            onClick={() => setShowError(false)}
          />
        </span>
      )
    }

    return ''
  }

  return (
    <Sticky>
      <div className="page-title">
        <div className="title-group">
          <div className="title">
            <h1>{props.title}</h1>
          </div>
          <span className="status">{renderStatus()}</span>
        </div>
        <div className="button-group">{props.children}</div>
      </div>
    </Sticky>
  )
}

export default PageHeader
