import { useState } from 'react'
import { Search, SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ConversationItem from './conversation-item'
import type { Conversation } from '../data/chat-data'

interface ContactPanelProps {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}

function ContactPanel({
  conversations,
  activeId,
  onSelect,
  className = '',
}: ContactPanelProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [onlyUnread, setOnlyUnread] = useState(false)

  const normalizedQuery = query.trim().toLowerCase()
  const unreadTotal = conversations.filter((c) => c.unread > 0).length
  const filteredConversations = conversations.filter(
    (c) =>
      (!onlyUnread || c.unread > 0) &&
      (!normalizedQuery ||
        `${c.name} ${c.lastMessage}`.toLowerCase().includes(normalizedQuery)),
  )

  return (
    <div
      className={`w-full shrink-0 flex-col border-borderColor md:w-80 md:border-e ${className}`}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-lg font-semibold text-foreground">{t('Chats')}</h2>
        <button
          type="button"
          aria-label={t('New chat')}
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <SquarePen size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-y-3 px-4 pt-3">
        <label className="glass-solid flex items-center gap-x-2 rounded-lg px-3 py-2 transition-colors focus-within:border-primary/50">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search conversations')}
            aria-label={t('Search conversations')}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </label>

        <div className="inline-flex w-fit items-center gap-x-1 rounded-lg bg-surface-hover/60 p-1">
          {[
            { value: false, label: t('All') },
            { value: true, label: t('Unread') },
          ].map(({ value, label }) => (
            <button
              key={label}
              type="button"
              aria-pressed={onlyUnread === value}
              onClick={() => setOnlyUnread(value)}
              className={`flex items-center gap-x-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                onlyUnread === value
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {label}
              {value && unreadTotal > 0 && (
                <span className="rounded-full bg-primary px-1.5 text-[10px] text-white">
                  {unreadTotal}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollbar-thin mt-2 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onClick={() => onSelect(c.id)}
            />
          ))
        ) : (
          <p className="p-4 text-center text-sm text-muted">
            {onlyUnread && !normalizedQuery
              ? t("You're all caught up.")
              : t('No conversations match your search.')}
          </p>
        )}
      </div>
    </div>
  )
}

export default ContactPanel
