import { useState } from 'react'
import { Check, Pipette } from 'lucide-react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'
import Popover from '#/components/popover'

interface CustomColorPickerProps {
  /** The active primary color when it isn't one of the preset swatches */
  customColor: string | null
  onConfirm: (color: string) => void
}

/** Turns "rgb(59 130 246)" / "rgb(51, 142, 252)" into "#3b82f6"; hex passes through */
function toHex(color: string) {
  if (color.startsWith('#')) return color
  const channels = color.match(/\d+/g)
  if (!channels || channels.length < 3) return '#3b82f6'
  return `#${channels
    .slice(0, 3)
    .map((c) => Number(c).toString(16).padStart(2, '0'))
    .join('')}`
}

function currentPrimaryHex() {
  return toHex(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim(),
  )
}

/** Rainbow swatch that opens a react-colorful picker; applies only on confirm */
function CustomColorPicker({ customColor, onConfirm }: CustomColorPickerProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('#3b82f6')
  const [initial, setInitial] = useState('#3b82f6')

  const handleOpenChange = (next: boolean) => {
    if (next) {
      // Start from whatever is applied right now, so Cancel is a true no-op
      const start = customColor ? toHex(customColor) : currentPrimaryHex()
      setInitial(start)
      setDraft(start)
    }
    setOpen(next)
  }

  const handleConfirm = () => {
    onConfirm(draft)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      closeOn="outside"
      placement="bottom-start"
      className="w-64 p-3!"
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
    >
      <div className="flex flex-col gap-y-3">
        <div className="color-picker">
          <HexColorPicker color={draft} onChange={setDraft} />
        </div>

        <div className="flex items-center gap-x-2">
          {/* Before / after */}
          <span
            className="flex h-9 w-14 shrink-0 overflow-hidden rounded-md ring-1 ring-borderColor"
            title={t('Current → New')}
          >
            <span className="flex-1" style={{ background: initial }} />
            <span className="flex-1" style={{ background: draft }} />
          </span>
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute inset-y-0 start-2.5 flex items-center font-mono text-sm text-muted">
              #
            </span>
            <HexColorInput
              color={draft}
              onChange={setDraft}
              aria-label={t('Hex color')}
              className="input w-full ps-6! font-mono text-sm uppercase"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-2 border-t border-borderColor pt-3">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setOpen(false)}
          >
            {t('Cancel')}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={draft.toLowerCase() === initial.toLowerCase()}
            onClick={handleConfirm}
          >
            <Check size={14} strokeWidth={2.5} />
            {t('Apply')}
          </button>
        </div>
      </div>
    </Popover>
  )
}

export default CustomColorPicker
