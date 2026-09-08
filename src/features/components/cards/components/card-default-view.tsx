import Card from '#/components/card/card'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CardDefaultView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Default{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          view="default"
        </span>
      </p>
      <Card view="default" className="max-w-sm">
        <Card.Header>
          <Card.Title>{t('Team members')}</Card.Title>
        </Card.Header>
        <Card.Content>
          <Card.Description>
            {t(`Invite teammates to collaborate on this workspace. They'll get
            access to shared projects and tasks`)}
            .
          </Card.Description>
        </Card.Content>
        <Card.Footer>
          <button type="button" className="btn btn-primary w-auto px-4">
            {t('Invite')}
          </button>
        </Card.Footer>
      </Card>
    </section>
  )
}

export default CardDefaultView
