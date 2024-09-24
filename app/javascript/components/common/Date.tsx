import React from 'react'
import moment from 'moment'

type DateProps = {
  date: string
}

const Date = (props: DateProps) => (
  <div>{moment(props.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')}</div>
)

export default Date
