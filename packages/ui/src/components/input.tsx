import { cn } from '../utils/general'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: Props) {
  const classes = cn("cartoon-container rounded-full bg-white placeholder:font-bold placeholder:text-slate", className)

  return (
    <input className={classes} {...props} />
  )
}