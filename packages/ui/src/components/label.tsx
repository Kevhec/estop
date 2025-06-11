import { LabelHTMLAttributes } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ children, ...props }: Props) {
  return (
    <label {...props}>
      {children}
    </label>
  )
}