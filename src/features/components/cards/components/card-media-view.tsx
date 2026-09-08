import Card from '#/components/card/card'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CardMediaView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        {t('Media')}{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          view="media"
        </span>
      </p>
      <Card view="media" className="max-w-sm">
        <Card.Media
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600"
          alt="Team collaborating"
        />
        <Card.Content>
          <Card.Title>{t(`Announcing the new dashboard`)}</Card.Title>
          <Card.Description>
            {t(`A faster, more accessible interface with full dark mode and RTL
            support`)}
            .
          </Card.Description>
        </Card.Content>
        <Card.Footer>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-x-1"
          >
            {t('Read more')} <ArrowRight size={18} className="rtl:rotate-180" />
          </a>
          <span className="text-xs text-muted">4 {t('min read')}</span>
        </Card.Footer>
      </Card>
    </section>
  )
}

export default CardMediaView
