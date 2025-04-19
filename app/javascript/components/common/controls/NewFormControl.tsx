import React, { PropsWithChildren } from 'react'

type FormControlProps = PropsWithChildren & {
  name: string
  label: string
  errorMessage?: string
}

export const FormControl = (props: FormControlProps) => (
  <div className={`form-group ${errorState(props.errorMessage)}`}>
    <label htmlFor={props.name} className="control-label text-uppercase">
      {props.label}
    </label>
    {props.children}
    {helpBlock(props.errorMessage)}
  </div>
)

function errorState(errorMessage?: string) {
  return errorMessage ? 'has-error' : 'has-success'
}

function helpBlock(errorMessage?: string) {
  if (errorMessage)
    return <div className="help-block text-danger">{errorMessage}</div>
  return <div />
}
