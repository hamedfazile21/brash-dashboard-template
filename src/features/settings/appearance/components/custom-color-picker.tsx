import { useState } from 'react'
import { Check, Pipette } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ColorPickerPopover from './color-picker-popover'

interface CustomColorPickerProps {
  /** The active primary color when it isn't one of the preset swatches */
  customColor: string | null
  onConfirm: (color: string) => void
}

/** Rainbow swatch that opens the color picker for a custom accent */
function CustomColorPicker({ customColor, onConfirm }: CustomColorPickerProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <ColorPickerPopover
      onOpenChange={setOpen}
      onConfirm={onConfirm}
      getInitialColor={() =>
        customColor ??
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-primary')
          .trim()
      }
      trigger={
        <button
          type="button"
          title={t('Custom')}
          aria-label={t('Custom')}
          className={`flex size-9 items-center justify-center rounded-full text-white ring-offset-2 ring-offset-background outline-none transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-foreground ${
            customColor || open ? 'scale-110 ring-2' : ''
          }`}
          style={{
            background:
              customColor ??
              'conic-gradient(from 180deg, #f43f5e, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #f43f5e)',
            ['--tw-ring-color' as string]:
              customColor ?? 'var(--color-primary)',
          }}
        >
          {customColor ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            <Pipette size={15} strokeWidth={2.5} className="drop-shadow" />
          )}
        </button>
      }
    />
  )
}

export default CustomColorPicker
