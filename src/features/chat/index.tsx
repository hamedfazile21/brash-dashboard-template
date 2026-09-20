import React, { useState, useRef, useEffect } from 'react'
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Circle,
  Mic,
  ImageIcon,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { conversations, messages } from './data/chat-data'
import TypingIndicator from './components/typing-indicator'
import MessageBubble from './components/message-bubble'
import ConversationItem from './components/conversation-item'
import ContactPanel from './components/contact-panel'
import NotActiveConversation from './components/not-active-conversation'
import EmptyMessagesConversation from './components/empty-messages-conversation'
import { GlassBlob } from '../../assets'

export default function Chat() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState('')
  const [draft, setDraft] = useState('')
  const [showTyping, setShowTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeConversation =
    conversations.find((c) => c.id === activeId) || null

  const messageBaseActiveConversation =
    messages.filter((item) => item.conversationId === activeId) || null

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [activeId, showTyping])

  const handleSend = () => {
    if (!draft.trim()) return
    setDraft('')
  }

  return (
    <div className="card p-1! flex h-[calc(100vh-6rem)] overflow-hidden rounded-2xl relative">
      <img src={GlassBlob} className="absolute left-50 -z-10" />
      {/* Conversation list */}
      <ContactPanel activeId={activeId} setActiveId={setActiveId} />

      {/* Chat thread */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-3.5 dark:border-white/10">
              <div className="flex items-center gap-x-3">
                <div className="relative">
                  <img
                    src={activeConversation?.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {activeConversation?.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {activeConversation?.name}
                  </span>
                  <span className="flex items-center gap-x-1 text-xs text-muted">
                    <Circle
                      size={6}
                      className={
                        activeConversation?.online
                          ? 'fill-success text-success'
                          : 'fill-muted text-muted'
                      }
                    />
                    {activeConversation?.online ? t('Online') : t('Offline')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-x-1">
                <button className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <Phone size={18} />
                </button>
                <button className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <Video size={18} />
                </button>
                <button className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <MoreVertical size={18} />
                </button>
                <button
                  onClick={() => setActiveId('')}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                >
                  <X size={18} className="text-danger" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto scrollbar-thin px-5 py-5"
            >
              {messageBaseActiveConversation.length === 0 ? (
                <EmptyMessagesConversation name={activeConversation.name} />
              ) : (
                messageBaseActiveConversation.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))
              )}
              {showTyping && <TypingIndicator />}
            </div>

            {/* Composer */}
            <div className="border-t border-black/8 px-4 py-3 dark:border-white/10">
              <div className="glass-solid flex items-end gap-x-2 rounded-2xl px-3 py-2">
                <button className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <Paperclip size={18} />
                </button>
                <button className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <ImageIcon size={18} />
                </button>

                <textarea
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={t('Type a message') ?? ''}
                  className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
                />

                <button className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                  <Smile size={18} />
                </button>

                {draft.trim() ? (
                  <button
                    onClick={handleSend}
                    className="flex shrink-0 items-center justify-center rounded-lg bg-primary p-2 text-white transition-transform duration-150 hover:scale-105 active:scale-95"
                  >
                    <Send size={16} />
                  </button>
                ) : (
                  <button className="flex shrink-0 items-center justify-center rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
                    <Mic size={18} />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <NotActiveConversation />
        )}

        {/* Messages */}
      </div>
    </div>
  )
}
