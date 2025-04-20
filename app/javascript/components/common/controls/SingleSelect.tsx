import React from 'react'

import Select, { GroupBase } from 'react-select'

type Option = {
  id: number
  name: string
}

type SingleSelectProps = {
  name: string
  allowUnassigned?: boolean
  value: number | undefined
  options?: Option[]
  groupedOptions?: GroupBase<Option>[]
  onChange: (newValue: number | undefined) => void
}

export const SingleSelect = (props: SingleSelectProps) => {
  const handleSelect = (newValue: Option | null) => {
    props.onChange(newValue?.id)
  }

  const optionForValue = (options: Option[], value: number) => {
    return options.find((option) => option.id === value)
  }

  const dropDownValue = (): Option | null | undefined => {
    if (!props.value) return null

    let option

    if (props.options) {
      option = optionForValue(props.options, props.value)
    }

    if (props.groupedOptions) {
      const allOptions = props.groupedOptions
        .map((group) => group.options)
        .flat()
      option = optionForValue(allOptions, props.value)
    }

    return option
  }

  return (
    <Select
      name={props.name}
      getOptionLabel={(option: Option) => option.name}
      getOptionValue={(option: Option) => option.id.toString()}
      value={dropDownValue()}
      options={props.options || props.groupedOptions}
      onChange={handleSelect}
      isClearable={!!props.allowUnassigned}
      isMulti={false}
      placeholder={props.allowUnassigned ? 'Un-assigned' : 'Please select...'}
      className="react-select"
      classNamePrefix="react-select"
    />
  )
}
