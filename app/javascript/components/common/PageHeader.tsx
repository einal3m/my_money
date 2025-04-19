import React, { ReactNode, useEffect, useState } from 'react'
import Sticky from 'react-sticky-el'

import '../../stylesheets/common.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/store'
import { ApiStatus } from 'stores/apiStatusSlice'

type PageHeaderProps = {
  isLoading: boolean
  errorString?: string
  title: string
  children?: ReactNode
}

const PageHeader = (props: PageHeaderProps) => {
  const [showMessage, setShowMessage] = useState(true)
  const { status, message } = useSelector(
    (state: RootState) => state.apiStatusStore,
  )

  useEffect(() => { 
    setShowMessage(true)
  },[status])

  const renderStatus = () => {
    if (props.isLoading || status === ApiStatus.LOADING) {
      return <i className="fa-solid fa-spinner fa-spin"></i>
    }

    if (status === ApiStatus.DONE && showMessage) {
      return (
        <div>
          <i className="fa-solid fa-check pr-1"></i>
          {message}
          <i
            className="fa fa-times-circle click-me pl-1"
            onClick={() => setShowMessage(false)}
          />
        </div>
      )
    }

    if (status === ApiStatus.ERROR && showMessage) {
      return (
        <div className="error">
          <i className="fa-solid fa-xmark pr-1"></i>
          {message}
          <i
            className="fa fa-times-circle click-me pl-1"
            onClick={() => setShowMessage(false)}
          />
        </div>
      )    }

    if (props.errorString && showMessage) {
      return (
        <span className="error">
          Error: {props.errorString}
          <i
            className="fa fa-times-circle click-me"
            onClick={() => setShowMessage(false)}
          />
        </span>
      )
    }

    return <></>
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
