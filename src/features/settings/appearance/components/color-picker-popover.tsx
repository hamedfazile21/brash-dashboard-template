import { useState } from 'react'
import type { ReactElement } from 'react'
import { Check } from 'lucide-react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'
import Popover from '#/components/popover'

/** Turns "rgb(59 130 246)" / "rgb(51, 142, 252)" into "#3b82f6"; hex passes through */
export function toHex(color: string) {
  if (color.startsWith('#')) return color
  const channels = color.match(/\d+/g)
  if (!channels || channels.length < 3) return '#3b82f6'
  return `#${channels
    .slice(0, 3)
    .map((c) => Number(c).toString(16).padStart(2, '0'))
    .join('')}`
}

interface ColorPickerPopoverProps {
  /** Must accept a ref — a native <button> works */
  trigger: ReactElement
  /** Read when the popover opens, so it always starts from the applied color */
  getInitialColor: () => string
  onConfirm: (color: string) => void
  onOpenChange?: (open: boolean) => void
}

/** react-colorful picker in a popover — nothing is applied until Apply */
function ColorPickerPopover({
  trigger,
  getInitialColor,
  onConfirm,
  onOpenChange,
}: ColorPickerPopoverProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('#3b82f6')
  const [initial, setInitial] = useState('#3b82f6')

  const handleOpenChange = (next: boolean) => {
    if (next) {
      const start = toHex(getInitialColor())
      setInitial(start)
      setDraft(start)
    }
    setOpen(next)
    onOpenChange?.(next)
  }

  const handleConfirm = () => {
    onConfirm(draft)
    handleOpenChange(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      closeOn="outside"
      placement="bottom-start"
      className="w-64 p-3!"
      trigger={trigger}
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
            onClick={() => handleOpenChange(false)}
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

export default ColorPickerPopover
