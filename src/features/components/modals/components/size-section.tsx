import { Ruler } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { sizeOptions, useModal } from './modal-provider'
import type { Size } from './modal-provider'
import ShowcaseSection from './showcase-section'

function SizeSection() {
  const { t } = useTranslation()
  const { activeSize, open, setActiveSize, openModal } = useModal()

  const openSize = (size: Size) => {
    setActiveSize(size)
    openModal('size')
  }

  return (
    <ShowcaseSection
      icon={Ruler}
      title="Sizes"
      description="Every step of the size scale, drawn to proportion"
    >
      <div className="card flex flex-col gap-y-1 p-2!">
        {sizeOptions.map(({ size, label, width, ruler }) => {
          const isActive = activeSize === size && open === 'size'
          return (
            <button
              key={size}
              type="button"
              onClick={() => openSize(size)}
              className={`group grid grid-cols-[5.5rem_1fr_auto] items-center gap-x-4 rounded-lg px-3 py-2.5 text-start transition-colors sm:grid-cols-[8rem_1fr_auto] ${
                isActive ? 'bg-primary/10' : 'hover:bg-surface-hover/60'
              }`}
            >
              <span>
                <span
                  className={`block text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                >
                  {t(label)}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  size="{size}"
                </span>
              </span>

              <span className="relative h-2 rounded-full bg-surface-hover">
                <span
                  className={`absolute inset-y-0 inset-s-0 rounded-full transition-colors ${ruler} ${
                    isActive
                      ? 'bg-primary'
                      : 'bg-primary/40 group-hover:bg-primary/70'
                  }`}
                />
              </span>

              <span
                className="font-mono text-xs text-muted tabular-nums"
                dir="ltr"
              >
                {width}
              </span>
            </button>
          )
        })}
      </div>
    </ShowcaseSection>
  )
}

export default SizeSection
