import React from 'react'

interface props {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isIndeterminate?: boolean
  reset?: React.ComponentProps<'input'>
  rounded?: boolean
  outline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const CheckBox: React.FC<props> = ({
  checked,
  onChange,
  isIndeterminate,
  rounded,
  outline,
  reset,
  size = 'md',
}) => {
  const shapeClass = rounded ? 'checkbox-rounded-full' : 'checkbox'

  return (
    <input
      type="checkbox"
      className={`${shapeClass} ${outline ? `${shapeClass}-outline` : ''} checkbox-${size}`}
      checked={checked}
      ref={(element) => {
        if (element) {
          element.indeterminate = isIndeterminate ?? false
        }
      }}
      onChange={onChange}
      {...reset}
    />
  )
}

export default CheckBox
