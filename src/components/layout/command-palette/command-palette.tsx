import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  ChevronRight,
  CornerDownLeft,
  History,
  Search,
  SearchX,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  PAGE_INDEX,
  matchesQuery,
  scopeColors,
  scopeLabels,
  usePaletteActions,
} from './search-index'
import type { PaletteItem } from './search-index'

const RECENT_KEY = 'search-recent'
const MAX_RECENT = 5
const SUGGESTED = ['/', '/to-do-list', '/chat', '/settings/appearance']
const ALL = 'All'

function readRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveRecent(id: string) {
  try {
    const next = [id, ...readRecent().filter((r) => r !== id)]
    localStorage.setItem(RECENT_KEY, JSON.stringify(next.slice(0, MAX_RECENT)))
  } catch {
    // Storage unavailable (private mode) — recents are just a convenience
  }
}

/* ------------------------------------------------------------------ */

function Highlight({ text, query }: { text: string; query: string }) {
  const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1
  if (index === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-[3px] bg-primary/20 px-px text-inherit">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  )
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-borderColor bg-surface px-1 font-mono text-[10px] font-medium text-muted shadow-[0_1px_0_var(--border)]">
      {children}
    </kbd>
  )
}

function ItemIcon({ item, size }: { item: PaletteItem; size: 'sm' | 'lg' }) {
  const Icon = item.icon
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${scopeColors[item.group] ?? scopeColors.Main} ${
        size === 'lg' ? 'size-16 rounded-2xl' : 'size-9 rounded-xl'
      }`}
    >
      <Icon
        size={size === 'lg' ? 28 : 17}
        strokeWidth={size === 'lg' ? 1.6 : 2}
      />
    </span>
  )
}

/** Right-hand detail of the highlighted item — wide screens only */
function Preview({
  item,
  related,
  onSelect,
}: {
  item: PaletteItem | undefined
  /** Siblings of the item (same parent or scope), shown as shortcuts */
  related: PaletteItem[]
  onSelect: (item: PaletteItem) => void
}) {
  const { t } = useTranslation()

  if (!item) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2 p-6 text-center text-muted">
        <Sparkles size={22} />
        <p className="text-xs">{t('Select an item to see details')}</p>
      </div>
    )
  }

  const crumbs = [
    scopeLabels[item.group] ?? item.group,
    item.parent,
    item.title,
  ]
    .filter(Boolean)
    .map((c) => t(c as string))

  return (
    <div key={item.id} className="flex h-full animate-message-in flex-col p-5">
      <ItemIcon item={item} size="lg" />

      <div className="mt-4 flex flex-wrap items-center gap-x-1 text-[11px] text-muted">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-x-1">
            {i > 0 && <ChevronRight size={11} className="rtl:rotate-180" />}
            {crumb}
          </span>
        ))}
      </div>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
        {t(item.title)}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        {t(item.description)}
      </p>

      <dl className="mt-5 flex flex-col gap-y-2 border-t border-borderColor pt-4 text-xs">
        <div className="flex items-center justify-between gap-x-2">
          <dt className="text-muted">{t('Type')}</dt>
          <dd className="font-medium text-foreground">
            {t(item.kind === 'action' ? 'Quick action' : 'Page')}
          </dd>
        </div>
        {item.href && (
          <div className="flex items-center justify-between gap-x-2">
            <dt className="text-muted">{t('URL')}</dt>
            <dd
              className="truncate font-mono text-[11px] text-foreground"
              dir="ltr"
            >
              {item.href}
            </dd>
          </div>
        )}
      </dl>

      {related.length > 0 && (
        <div className="mt-5">
          <p className="mb-1.5 text-[11px] font-semibold tracking-wider text-muted uppercase">
            {t('Related')}
          </p>
          <div className="flex flex-col gap-y-0.5">
            {related.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelect(rel)}
                className="group flex items-center gap-x-2 rounded-lg px-2 py-1.5 text-start text-xs text-foreground transition-colors hover:bg-surface-hover/70"
              >
                <rel.icon size={14} className="shrink-0 text-muted" />
                <span className="min-w-0 flex-1 truncate">
                  {rel.parent ? `${t(rel.parent)} / ` : ''}
                  {t(rel.title)}
                </span>
                <ArrowRight
                  size={12}
                  className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center gap-x-1.5 pt-4 text-[11px] text-muted">
        <Kbd>↵</Kbd>
        {t(item.kind === 'action' ? 'to run' : 'to open')}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

/** ⌘K palette: search pages and run quick actions, with scopes and a live preview */
function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const actions = usePaletteActions()
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState(ALL)
  const [activeIndex, setActiveIndex] = useState(0)
  const [recent, setRecent] = useState<string[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fresh state every time the palette opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setScope(ALL)
      setActiveIndex(0)
      setRecent(readRecent())
    }
  }, [open])

  const allItems = useMemo(() => [...actions, ...PAGE_INDEX], [actions])
  const scopes = useMemo(
    () => [ALL, ...new Set(allItems.map((item) => item.group))],
    [allItems],
  )
  const trimmed = query.trim()

  /** Sections in display order; the flat index across them drives the keyboard */
  const sections = useMemo(() => {
    const inScope = (item: PaletteItem) => scope === ALL || item.group === scope

    if (!trimmed) {
      const byId = (id: string) => allItems.find((item) => item.id === id)
      const pages = (recent.length > 0 ? recent : SUGGESTED)
        .map(byId)
        .filter((item): item is PaletteItem => !!item && inScope(item))
      const result: {
        title: string
        icon: typeof History
        items: PaletteItem[]
      }[] = []
      if (scope === ALL) {
        result.push({ title: 'Quick actions', icon: Zap, items: actions })
        result.push({
          title: recent.length > 0 ? 'Recent' : 'Suggested',
          icon: recent.length > 0 ? History : Sparkles,
          items: pages,
        })
      } else {
        result.push({
          title: scopeLabels[scope] ?? scope,
          icon: Sparkles,
          items: allItems.filter(inScope),
        })
      }
      return result.filter((section) => section.items.length > 0)
    }

    const matches = allItems.filter(
      (item) => inScope(item) && matchesQuery(item, trimmed, t),
    )
    const grouped = new Map<string, PaletteItem[]>()
    for (const item of matches) {
      grouped.set(item.group, [...(grouped.get(item.group) ?? []), item])
    }
    return [...grouped.entries()].map(([group, items]) => ({
      title: scopeLabels[group] ?? group,
      icon: Sparkles,
      items,
    }))
  }, [trimmed, scope, recent, allItems, actions, t])

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections])
  const active = flat[activeIndex] as PaletteItem | undefined

  // Same parent first (Login → Basic for Login → Cover), topped up from the same scope
  const related = useMemo(() => {
    if (!active) return []
    const others = allItems.filter((item) => item.id !== active.id)
    const sameParent = active.parent
      ? others.filter((item) => item.parent === active.parent)
      : []
    const sameScope = others.filter(
      (item) => item.group === active.group && !sameParent.includes(item),
    )
    return [...sameParent, ...sameScope].slice(0, 3)
  }, [active, allItems])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const run = (item: PaletteItem) => {
    onClose()
    if (item.kind === 'page' && item.href) {
      saveRecent(item.id)
      navigate({ to: item.href })
    } else {
      item.run?.()
    }
  }

  const changeScope = (next: string) => {
    setScope(next)
    setActiveIndex(0)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      // Tab / Shift+Tab cycle through the scope chips
      e.preventDefault()
      const i = scopes.indexOf(scope)
      changeScope(
        scopes[(i + (e.shiftKey ? -1 : 1) + scopes.length) % scopes.length],
      )
      return
    }
    if (flat.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % flat.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + flat.length) % flat.length)
    } else if (e.key === 'Enter' && active) {
      e.preventDefault()
      run(active)
    }
  }

  let runningIndex = -1

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-start justify-center px-3 pt-[8vh] sm:px-4 sm:pt-[12vh]">
        <DialogPanel
          transition
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-borderColor bg-background/95 shadow-[0_32px_80px_-20px_rgb(0_0_0/0.45)] ring-1 ring-white/10 backdrop-blur-2xl transition duration-200 ease-out data-closed:-translate-y-2 data-closed:scale-[0.97] data-closed:opacity-0"
        >
          {/* Accent hairline, same as the auth cards */}
          <div
            aria-hidden
            className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
          />

          {/* Search field */}
          <div className="flex items-center gap-x-3 px-4 pt-4 pb-3">
            <Search
              size={20}
              className={`shrink-0 transition-colors ${trimmed ? 'text-primary' : 'text-muted'}`}
            />
            <input
              ref={inputRef}
              autoFocus
              type="text"
              role="combobox"
              aria-expanded
              aria-controls="palette-results"
              aria-activedescendant={
                active ? `palette-option-${activeIndex}` : undefined
              }
              aria-label={t('Search pages')}
              placeholder={t('Search pages, apps and actions...')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted/70"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
                aria-label={t('Clear search')}
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <X size={15} />
              </button>
            ) : (
              <Kbd>esc</Kbd>
            )}
          </div>

          {/* Scope chips */}
          <div className="flex gap-x-1.5 overflow-x-auto border-b border-borderColor px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {scopes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={scope === s}
                onClick={() => changeScope(s)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  scope === s
                    ? 'bg-foreground text-background'
                    : 'bg-surface-hover/60 text-muted hover:bg-surface-hover hover:text-foreground'
                }`}
              >
                {t(s === ALL ? 'All' : (scopeLabels[s] ?? s))}
              </button>
            ))}
          </div>

          {/* Body: results + preview */}
          <div className="flex h-[min(26rem,58vh)]">
            <div
              ref={listRef}
              id="palette-results"
              role="listbox"
              className="min-w-0 flex-1 overflow-y-auto p-2"
            >
              {flat.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-y-3 px-6 text-center">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-surface-hover text-muted">
                    <SearchX size={24} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t('No results for "{{query}}"', { query: trimmed })}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {scope === ALL
                        ? t('Try a page name, like "chat" or "login".')
                        : t('Nothing here — try searching all scopes.')}
                    </p>
                  </div>
                  {scope !== ALL && (
                    <button
                      type="button"
                      onClick={() => changeScope(ALL)}
                      className="btn btn-secondary btn-sm"
                    >
                      {t('Search everywhere')}
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </button>
                  )}
                </div>
              ) : (
                sections.map((section) => (
                  <div
                    key={section.title}
                    role="group"
                    aria-label={t(section.title)}
                    className="mb-2 last:mb-0"
                  >
                    <p className="flex items-center gap-x-1.5 px-2.5 pt-2 pb-1.5 text-[11px] font-semibold tracking-wider text-muted uppercase">
                      <section.icon size={12} />
                      {t(section.title)}
                    </p>
                    {section.items.map((item) => {
                      runningIndex += 1
                      const index = runningIndex
                      const isActive = index === activeIndex
                      return (
                        <button
                          key={item.id}
                          id={`palette-option-${index}`}
                          data-index={index}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseMove={() => setActiveIndex(index)}
                          onClick={() => run(item)}
                          className={`relative flex w-full items-center gap-x-3 rounded-xl px-2.5 py-2 text-start transition-colors duration-100 ${
                            isActive ? 'bg-surface-hover/70' : ''
                          }`}
                        >
                          {isActive && (
                            <span className="absolute inset-y-2 inset-s-0 w-0.5 rounded-full bg-primary" />
                          )}
                          <ItemIcon item={item} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-foreground">
                              {item.parent && (
                                <span className="text-muted">
                                  <Highlight
                                    text={t(item.parent)}
                                    query={trimmed}
                                  />
                                  <ChevronRight
                                    size={12}
                                    className="mx-0.5 inline align-[-1px] rtl:rotate-180"
                                  />
                                </span>
                              )}
                              <Highlight text={t(item.title)} query={trimmed} />
                            </span>
                            <span className="block truncate text-xs text-muted">
                              {t(item.description)}
                            </span>
                          </span>
                          {isActive ? (
                            <span className="flex shrink-0 items-center gap-x-1 text-[11px] font-medium text-primary">
                              {t(item.kind === 'action' ? 'Run' : 'Open')}
                              <CornerDownLeft
                                size={13}
                                className="rtl:-scale-x-100"
                              />
                            </span>
                          ) : (
                            item.kind === 'action' && (
                              <span className="shrink-0 rounded-md bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-muted">
                                {t('Action')}
                              </span>
                            )
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            <aside className="hidden w-72 shrink-0 border-s border-borderColor bg-surface/40 md:block">
              <Preview item={active} related={related} onSelect={run} />
            </aside>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-x-4 border-t border-borderColor bg-surface/40 px-4 py-2.5 text-[11px] text-muted">
            <div className="hidden items-center gap-x-4 sm:flex">
              <span className="flex items-center gap-x-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                {t('Navigate')}
              </span>
              <span className="flex items-center gap-x-1.5">
                <Kbd>↵</Kbd>
                {t('Open')}
              </span>
              <span className="flex items-center gap-x-1.5">
                <Kbd>tab</Kbd>
                {t('Switch scope')}
              </span>
            </div>
            <span className="tabular-nums">
              {t('{{count}} results', { count: flat.length })}
            </span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CommandPalette
