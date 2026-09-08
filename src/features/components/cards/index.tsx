import Card from '#/components/card/card'
import { DollarSign, TrendingUp, Heart, Bookmark } from 'lucide-react'
import CardDefaultView from './components/card-default-view'
import CardStatView from './components/card-stat-view'
import CardMediaView from './components/card-media-view'
import CardHoverView from './components/card-hover-view'
import CardHorizontalView from './components/card-horizontal-view'
import CardProfileView from './components/card-profile-view'

function CardShowcase() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Card</h1>
        <p className="mt-1 text-sm text-muted">
          Six views, all built on the same compound Card component — only the{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            view
          </code>{' '}
          prop changes.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-x-5">
          <CardDefaultView />
          <CardStatView />
        </div>

        <div className="flex items-start gap-x-5">
          <CardMediaView />
          <CardHoverView />
        </div>
        <div className="flex items-start gap-5">
          <CardHorizontalView />
          <CardProfileView />
        </div>
      </div>
    </div>
  )
}

export default CardShowcase
