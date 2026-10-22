import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  Circle,
  ImageIcon,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  conversations as initialConversations,
  messages as initialMessages,
} from './data/chat-data'
import type { Conversation, Message } from './data/chat-data'
import TypingIndicator from './components/typing-indicator'
import MessageBubble from './components/message-bubble'
import ContactPanel from './components/contact-panel'
import NotActiveConversation from './components/not-active-conversation'
import EmptyMessagesConversation from './components/empty-messages-conversation'
import { GlassBlob } from '../../assets'

/** Demo replies — the template has no backend, so the other side is simulated */
const cannedReplies = [
  'Sounds good to me!',
  'Got it, thanks for the update.',
  'Let me check and get back to you.',
  'Perfect, that works.',
  'Haha, nice one 😄',
  'Can we talk about this tomorrow?',
]

const now = () =>
  new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const iconButton =
  'rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground'

export default function Chat() {
  const { t } = useTranslation()
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [activeId, setActiveId] = useState('')
  const [draft, setDraft] = useState('')
  const [typingIn, setTypingIn] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timers = useRef<number[]>([])
  // Read inside timeouts, which would otherwise see a stale activeId
  const activeIdRef = useRef(activeId)
  activeIdRef.current = activeId

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null
  const thread = messages.filter((m) => m.conversationId === activeId)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [activeId, thread.length, typingIn])

  const resizeTextarea = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const updateConversation = (id: string, change: Partial<Conversation>) =>
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...change } : c)),
    )

  const setMessageStatus = (id: string, status: Message['status']) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const openConversation = (id: string) => {
    setActiveId(id)
    setDraft('')
    updateConversation(id, { unread: 0 })
  }

  const handleSend = () => {
    const text = draft.trim()
    if (!text || !activeId) return

    const conversationId = activeId
    const sentId = `local-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      {
        id: sentId,
        senderId: 'me',
        text,
        time: now(),
        status: 'sent',
        conversationId,
      },
    ])
    updateConversation(conversationId, { lastMessage: text, time: now() })
    setDraft('')
    requestAnimationFrame(resizeTextarea)

    later(700, () => setMessageStatus(sentId, 'delivered'))
    later(1200, () => setTypingIn(conversationId))
    later(2800, () => {
      const reply =
        cannedReplies[Math.floor(Math.random() * cannedReplies.length)]
      setTypingIn((current) => (current === conversationId ? null : current))
      setMessageStatus(sentId, 'read')
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          senderId: 'them',
          text: reply,
          time: now(),
          conversationId,
        },
      ])
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: reply,
                time: now(),
                // Only count as unread if the user has moved to another chat
                unread:
                  activeIdRef.current === conversationId ? 0 : c.unread + 1,
              }
            : c,
        ),
      )
    })
  }

  return (
    <div className="card relative flex h-[calc(100vh-7rem)] overflow-hidden rounded-2xl p-0!">
      <img
        src={GlassBlob}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-s-1/3 -z-10 opacity-70"
      />

      {/* On mobile the list and the thread take turns filling the card */}
      <ContactPanel
        conversations={conversations}
        activeId={activeId}
        onSelect={openConversation}
        className={activeId ? 'hidden md:flex' : 'flex'}
      />

      <div
        className={`min-w-0 flex-1 flex-col ${activeId ? 'flex' : 'hidden md:flex'}`}
      >
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-x-2 border-b border-borderColor px-3 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-x-3">
                <button
                  type="button"
                  onClick={() => setActiveId('')}
                  aria-label={t('Back to chats')}
                  className={`${iconButton} -ms-1 md:hidden`}
                >
                  <ChevronLeft size={20} className="rtl:-scale-x-100" />
                </button>
                <div className="relative shrink-0">
                  <img
                    src={activeConversation.avatar}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                  {activeConversation.online && (
                    <span className="absolute inset-e-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-surface" />
                  )}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {activeConversation.name}
                  </span>
                  <span className="flex items-center gap-x-1 text-xs text-muted">
                    {typingIn === activeId ? (
                      <span className="text-primary">{t('typing...')}</span>
                    ) : (
                      <>
                        <Circle
                          size={6}
                          className={
                            activeConversation.online
                              ? 'fill-success text-success'
                              : 'fill-muted text-muted'
                          }
                        />
                        {activeConversation.online ? t('Online') : t('Offline')}
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-0.5">
                <button
                  type="button"
                  aria-label={t('Voice call')}
                  className={iconButton}
                >
                  <Phone size={18} />
                </button>
                <button
                  type="button"
                  aria-label={t('Video call')}
                  className={`${iconButton} hidden sm:block`}
                >
                  <Video size={18} />
                </button>
                <button
                  type="button"
                  aria-label={t('More actions')}
                  className={iconButton}
                >
                  <MoreVertical size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveId('')}
                  aria-label={t('Close chat')}
                  className={`${iconButton} hidden md:block`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scrollbar-thin flex flex-1 flex-col gap-y-3 overflow-y-auto px-3 py-5 sm:px-5"
            >
              {thread.length === 0 ? (
                <EmptyMessagesConversation name={activeConversation.name} />
              ) : (
                <>
                  <div className="flex items-center gap-x-3 py-1 text-xs text-muted">
                    <span className="h-px flex-1 bg-borderColor" />
                    {t('Today')}
                    <span className="h-px flex-1 bg-borderColor" />
                  </div>
                  {thread.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                  ))}
                </>
              )}
              {typingIn === activeId && <TypingIndicator />}
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-borderColor p-3">
              <div className="glass-solid flex items-end gap-x-1 rounded-2xl px-2 py-1.5 transition-colors focus-within:border-primary/50">
                <button
                  type="button"
                  aria-label={t('Attach file')}
                  className={`${iconButton} shrink-0`}
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="button"
                  aria-label={t('Send image')}
                  className={`${iconButton} hidden shrink-0 sm:block`}
                >
                  <ImageIcon size={18} />
                </button>

                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value)
                    resizeTextarea()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={t('Type a message')}
                  aria-label={t('Type a message')}
                  className="max-h-32 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted"
                />

                <button
                  type="button"
                  aria-label={t('Emoji')}
                  className={`${iconButton} shrink-0`}
                >
                  <Smile size={18} />
                </button>

                {draft.trim() ? (
                  <button
                    type="button"
                    onClick={handleSend}
                    aria-label={t('Send')}
                    className="flex shrink-0 items-center justify-center rounded-xl bg-primary p-2 text-white shadow-md shadow-primary/30 transition-transform duration-150 hover:scale-105 active:scale-95"
                  >
                    <Send size={18} className="rtl:-scale-x-100" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label={t('Voice message')}
                    className={`${iconButton} shrink-0`}
                  >
                    <Mic size={18} />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <NotActiveConversation />
        )}
      </div>
    </div>
  )
}
