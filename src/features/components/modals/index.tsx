import ShowcaseHeader from '../shared/showcase-header'
import Dialogs from './components/dialogs'
import PatternsSection from './components/patterns-section'
import TransitionsSection from './components/transitions-section'
import SizeSection from './components/size-section'
import { sizeOptions, transitionOptions } from './components/modal-provider'

const PATTERN_COUNT = 7

function Modals() {
  const stats = [
    { value: PATTERN_COUNT, label: 'Patterns' },
    { value: transitionOptions.length, label: 'Transitions' },
    { value: sizeOptions.length, label: 'Sizes' },
    { value: 4, label: 'Positions' },
  ]

  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Modals"
        description="Dialog patterns, transitions and sizes — all built on the shared Dialog component. Open any of them to try it live."
        code="<Dialog open onClose title size position transition />"
        stats={stats}
      />

      <PatternsSection />
      <TransitionsSection />
      <SizeSection />

      <Dialogs />
    </div>
  )
}

export default Modals
