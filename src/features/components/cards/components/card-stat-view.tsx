import Card from '#/components/card/card'
import { DollarSign, TrendingUp } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CardStatView = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Stat{' '}
        <span className="ml-2 text-xs font-normal text-muted">view="stat"</span>
      </p>
      <Card view="stat" className="max-w-sm">
        <Card.Header>
          <Card.Description>{t('Total Revenue')}</Card.Description>
          <Card.Title>$42,580</Card.Title>
          <span className="mt-1.5 flex items-center gap-x-1 text-xs font-medium text-emerald-500">
            <TrendingUp size={13} />
            +12.4% {t('from last month')}
          </span>
        </Card.Header>
        <Card.Icon>
          <DollarSign size={19} />
        </Card.Icon>
      </Card>
    </section>
  )
}

export default CardStatView
