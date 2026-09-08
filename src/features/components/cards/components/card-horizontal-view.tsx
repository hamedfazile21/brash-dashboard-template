import Card from '#/components/card/card'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CardHorizontalView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        {t('Horizontal')}{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          view="horizontal"
        </span>
      </p>
      <Card view="horizontal" className="max-w-md">
        <Card.Media
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400"
          alt="Team collaborating"
        />
        <Card.Content>
          <Card.Title>{t('Announcing the new dashboard')}</Card.Title>
          <Card.Description>
            {t(`A faster, more accessible interface with full dark mode and RTL
            support, built for teams that ship quickly`)}
            .
          </Card.Description>
        </Card.Content>
      </Card>
    </section>
  )
}

export default CardHorizontalView
