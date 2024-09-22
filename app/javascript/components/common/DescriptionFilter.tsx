import React from 'react'

type DescriptionFilterProps = {
  description?: string
  onChange: (description?: string) => void
}

const DescriptionFilter = (props: DescriptionFilterProps) => {
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onChange(event.currentTarget.value)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onChange(event.currentTarget.value)
    }
  }

  return (
    <div className="description-filter">
      <label htmlFor="bank" className="control-label">
        Search Text
      </label>
      <input
        className="form-control col-xs-8"
        name="bank"
        type="text"
        defaultValue={props.description}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
      />
    </div>
  )
}

export default DescriptionFilter
