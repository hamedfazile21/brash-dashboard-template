import Card from '#/components/card/card'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CardProfileView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Profile{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          view="profile"
        </span>
      </p>
      <Card view="profile" className="max-w-xs">
        <Card.Avatar name="Hamed Fazeli" />
        <Card.Content>
          <Card.Title>Hamed Fazeli</Card.Title>
          <Card.Description>{t('Product Designer')}</Card.Description>
        </Card.Content>
        <Card.Footer>
          <button type="button" className="btn btn-secondary w-auto px-4">
            {t('Message')}
          </button>
          <button type="button" className="btn btn-primary w-auto px-4">
            {t('Follow')}
          </button>
        </Card.Footer>
      </Card>
    </section>
  )
}

export default CardProfileView
