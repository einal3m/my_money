import React, { PropsWithChildren, MouseEvent } from 'react'

const buttonTypeMapper = {
  secondary: 'default',
  primary: 'success',
  link: 'link',
  delete: 'danger',
  submit: 'success'
}

type ButtonProps = PropsWithChildren & {
  type?: 'secondary' | 'primary' | 'link' | 'delete' | 'submit'
  pullLeft?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = (props: ButtonProps) => {
  const buttonType = props.type || 'secondary'
  return (
    <button
      onClick={props.onClick}
      className={`btn btn-${buttonTypeMapper[buttonType]} ${props.pullLeft ? 'pull-left' : ''}`}
      type={props.type == 'submit' ? 'submit' : undefined}
      form={props.type == 'submit' ? 'modal-form': undefined}
    >
      {props.children}
    </button>
  )
}

export default Button
