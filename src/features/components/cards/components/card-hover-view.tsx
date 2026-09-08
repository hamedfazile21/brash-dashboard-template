import Card from '#/components/card/card'
import { Bookmark, Heart } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CardHoverView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Hover Reveal{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          view="hover"
        </span>
      </p>
      <Card view="hover" className="max-w-sm">
        <Card.Media
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600"
          alt="Workspace"
        />
        <Card.Actions>
          <button
            type="button"
            aria-label="Like"
            className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Heart size={15} />
          </button>
          <button
            type="button"
            aria-label="Save"
            className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Bookmark size={15} />
          </button>
        </Card.Actions>
        <Card.Content>
          <Card.Title>{t('Minimal workspace setup')}</Card.Title>
          <Card.Description>
            {t('A calm, distraction-free desk for focused work')}.
          </Card.Description>
        </Card.Content>
      </Card>
    </section>
  )
}

export default CardHoverView
