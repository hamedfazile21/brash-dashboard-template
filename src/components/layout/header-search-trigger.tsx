import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CommandPalette from './command-palette/command-palette'

function useHeaderSearch() {
  const [searchOpen, setSearchOpen] = useState(false)

  // ⌘K (Mac) / Ctrl+K (Windows/Linux) toggles search from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { searchOpen, setSearchOpen }
}

function HeaderSearchTrigger({ onOpen }: { onOpen: () => void }) {
  const { t } = useTranslation()
  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().includes('MAC')

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t('Search')}
      className="glass-solid flex items-center gap-x-2 rounded-md px-3 py-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none sm:w-64"
    >
      <Search size={16} className="shrink-0" />
      <span className="hidden flex-1 text-start sm:inline">
        {t('Search...')}
      </span>
      <kbd
        dir="ltr"
        className="hidden shrink-0 rounded border border-borderColor bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted sm:inline-block"
      >
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  )
}

export {
  useHeaderSearch,
  HeaderSearchTrigger,
  CommandPalette as HeaderSearchDialog,
}
