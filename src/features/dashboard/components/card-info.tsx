import Card from '#/components/card/card'
import {
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import React from 'react'

const stats = [
  {
    label: 'Total Revenue',
    value: '$42,580',
    change: '+12.4%',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: '+8.1%',
    up: true,
    icon: Users,
  },
  {
    label: 'Orders',
    value: '1,204',
    change: '-2.3%',
    up: false,
    icon: ShoppingCart,
  },
]

const CardInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, change, up, icon: Icon }) => (
        <Card key={label} view="stat" className="">
          <Card.Header>
            <Card.Description>{label}</Card.Description>
            <Card.Title>{value}</Card.Title>
            <span
              className={`mt-1.5 flex items-center gap-x-1 text-xs font-medium ${up ? 'text-emerald-500' : 'text-danger'} `}
            >
              <TrendingUp size={13} />
              {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {change}
            </span>
          </Card.Header>
          <Card.Icon>
            <Icon size={18} />
          </Card.Icon>
        </Card>
      ))}
    </div>
  )
}

export default CardInfo
