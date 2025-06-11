import { cn } from '../utils/general'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: Props) {
  const classes = cn("cartoon-container rounded-full bg-white placeholder:text-center placeholder:font-bold", className)

  return (
    <input className={classes} {...props} />
  )
}