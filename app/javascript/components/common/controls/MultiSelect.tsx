import React from 'react'
import Select, { GroupBase, MultiValue, SingleValue } from 'react-select'

export type Option = {
  id: number
  name: string

  // allow any extra attributes we don't care about here
  [key: string]: unknown;
}

export type SingleOption = SingleValue<Option>
export type MultiOption = MultiValue<Option>

type MultiSelectProps = {
  isMulti?: boolean
  name: string
  allowUnassigned?: boolean
  value: Option | Option[] | undefined
  options?: Option[]
  groupedOptions?: GroupBase<Option>[]
  onChange: (newValue: MultiOption | SingleOption | null ) => void
}

const MultiSelect = (props: MultiSelectProps) => {
  return (
    <Select
      value={props.value}
      getOptionLabel={(option: Option) => option.name}
      getOptionValue={(option: Option) => option.id.toString()}
      options={props.options || props.groupedOptions}
      onChange={props.onChange}
      isClearable={!!props.allowUnassigned}
      isMulti={!!props.isMulti}
      placeholder={props.allowUnassigned ? 'Un-assigned' : 'Please select...'}
      backspaceRemovesValue
      className="react-select"
      classNamePrefix="react-select"
    />
  )
}

export default MultiSelect
