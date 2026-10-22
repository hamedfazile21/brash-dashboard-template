import { Clapperboard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { transitionOptions, useModal } from './modal-provider'
import type { TransitionVariant } from './modal-provider'
import ShowcaseSection from '../../shared/showcase-section'

function TransitionsSection() {
  const { t } = useTranslation()
  const { activeTransition, setActiveTransition, open, openModal } = useModal()

  const openTransition = (variant: TransitionVariant) => {
    setActiveTransition(variant)
    openModal('transition')
  }

  return (
    <ShowcaseSection
      icon={Clapperboard}
      title="Transitions"
      description="Hover to get a feel for the motion, click to open a live dialog"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {transitionOptions.map(
          ({ variant, label, icon: Icon, hoverMotion }) => {
            const isActive =
              activeTransition === variant && open === 'transition'
            return (
              <button
                key={variant}
                type="button"
                onClick={() => openTransition(variant)}
                className={`card group flex flex-col items-center gap-y-3 py-5! text-center outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? 'border-primary/50! bg-primary/10!' : 'card-hover'
                }`}
              >
                {/* A mini panel that drifts the way the dialog will enter */}
                <span className="relative flex size-14 items-center justify-center rounded-xl border border-dashed border-borderColor">
                  <span
                    className={`flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/30 transition-all duration-500 ease-out ${hoverMotion}`}
                  >
                    <Icon size={16} />
                  </span>
                </span>
                <span>
                  <span
                    className={`block text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                  >
                    {t(label)}
                  </span>
                  <span className="block font-mono text-[11px] text-muted">
                    {variant}
                  </span>
                </span>
              </button>
            )
          },
        )}
      </div>
    </ShowcaseSection>
  )
}

export default TransitionsSection
