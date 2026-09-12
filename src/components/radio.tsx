import type { ChangeEvent, ComponentProps, FC } from 'react'

interface RadioProps {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  reset?: ComponentProps<'input'>
  outline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Radio: FC<RadioProps> = ({
  checked,
  onChange,
  outline,
  reset,
  size = 'md',
}) => {
  return (
    <input
      type="radio"
      className={`radio ${outline ? 'radio-outline' : ''} radio-${size}`}
      checked={checked}
      onChange={onChange}
      {...reset}
    />
  )
}

export default Radio
