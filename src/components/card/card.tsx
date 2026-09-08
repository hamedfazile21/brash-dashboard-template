import type { ReactNode } from 'react'
import { CardContext, type CardView } from './card-provider'
import { CardTitle } from './card-title'
import { CardHeader } from './card-header'
import { CardContent } from './card-content'
import { CardDescription } from './card-description'
import { CardFooter } from './card-footer'
import { CardMedia } from './card-media'
import { CardIcon } from './card-icon'
import { CardActions } from './card-action'
import { CardAvatar } from './card-avatar'

/* ==========================================================================
   Card (root)
   ========================================================================== */
interface CardProps {
  children: ReactNode
  view?: CardView
  className?: string
}

const rootViewClasses: Record<CardView, string> = {
  default: `card group relative overflow-hidden p-0! transition-all duration-300 ease-out
    hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-black/10`,
  stat: `card flex items-center justify-between relative overflow-hidden p-5 transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`,
  media: `card group overflow-hidden p-0 transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`,
  hover: `group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl
    transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-black/30`,
  // Image on the left, content on the right — list/search-result style
  horizontal: `card group flex overflow-hidden p-0 transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`,
  // Centered avatar + name + role, e.g. a team-member card
  profile: `card flex flex-col items-center p-6 text-center transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`,
}

function Card({ children, view = 'default', className = '' }: CardProps) {
  return (
    <CardContext.Provider value={{ view }}>
      <div className={`${rootViewClasses[view]} ${className}`}>
        {children}

        {view === 'default' && (
          <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100" />
        )}

        {view === 'stat' && (
          <span className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-primary/10 blur-2xl" />
        )}

        {view === 'hover' && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
        )}
      </div>
    </CardContext.Provider>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter
Card.Media = CardMedia
Card.Icon = CardIcon
Card.Actions = CardActions
Card.Avatar = CardAvatar

export default Card
