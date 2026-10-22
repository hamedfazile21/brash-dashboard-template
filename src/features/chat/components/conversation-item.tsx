import type { Conversation } from '../data/chat-data'

const ConversationItem = ({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation
  active: boolean
  onClick: () => void
}) => {
  const hasUnread = conversation.unread > 0

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={`relative flex w-full items-center gap-x-3 rounded-xl px-3 py-2.5 text-start transition-colors duration-150 ${
        active ? 'bg-primary/10' : 'hover:bg-surface-hover/60'
      }`}
    >
      {active && (
        <span className="absolute inset-y-3 inset-s-0 w-1 rounded-full bg-primary" />
      )}

      <div className="relative shrink-0">
        <img
          src={conversation.avatar}
          alt=""
          className="size-11 rounded-full object-cover"
        />
        {conversation.online && (
          <span className="absolute inset-e-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-surface" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-x-2">
          <span
            className={`truncate text-sm ${
              active
                ? 'font-semibold text-primary'
                : hasUnread
                  ? 'font-semibold text-foreground'
                  : 'font-medium text-foreground'
            }`}
          >
            {conversation.name}
          </span>
          <span
            className={`shrink-0 text-[11px] ${hasUnread ? 'font-medium text-primary' : 'text-muted'}`}
          >
            {conversation.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <span
            className={`truncate text-xs ${hasUnread ? 'text-foreground' : 'text-muted'}`}
          >
            {conversation.lastMessage}
          </span>
          {hasUnread && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export default ConversationItem
