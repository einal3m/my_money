import React, { PropsWithChildren, MouseEvent } from 'react'

const buttonTypeMapper = {
  secondary: 'default',
  primary: 'success',
  link: 'link',
  delete: 'danger',
}

type ButtonProps = PropsWithChildren & {
  type?: 'secondary' | 'primary' | 'link' | 'delete'
  pullLeft?: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = (props: ButtonProps) => {
  const buttonType = props.type || 'secondary'
  return (
    <button
      onClick={props.onClick}
      className={`btn btn-${buttonTypeMapper[buttonType]} ${props.pullLeft ? 'pull-left' : ''}`}
    >
      {props.children}
    </button>
  )
}

export default Button
