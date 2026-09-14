import { useState } from 'react'
import { categories } from './data/icons'
import { Check, Copy, ExternalLink, Search } from 'lucide-react'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../public/assets'

function IconShowcase() {
  const [search, setSearch] = useState('')
  const [copiedName, setCopiedName] = useState<string | null>(null)

  const query = search.trim().toLowerCase()
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      icons: cat.icons.filter((i) => i.name.toLowerCase().includes(query)),
    }))
    .filter((cat) => cat.icons.length > 0)

  const totalCount = categories.reduce((sum, c) => sum + c.icons.length, 0)

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} />`)
    setCopiedName(name)
    setTimeout(() => setCopiedName(null), 1200)
  }

  return (
    <div className="relative">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Icons</h1>
        <p className="mt-1 text-sm text-muted">
          A curated set of{' '}
          <a
            href="https://lucide.dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-x-1 font-medium text-primary hover:underline"
          >
            Lucide
            <ExternalLink size={12} />
          </a>{' '}
          icons ({totalCount} shown) used throughout this dashboard. Click any
          icon to copy its JSX.
        </p>
      </div>
      <div className="mx-auto card flex w-full flex-col gap-y-6">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ltr:left-3 rtl:right-3"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="glass-solid w-full rounded-md py-2 text-sm text-foreground outline-none
            transition-all duration-200 placeholder:text-muted
            focus:border-primary/50 focus:ring-2 focus:ring-primary/30
            ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3"
          />
        </div>

        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center gap-y-2 py-16 text-center">
            <Search size={24} className="text-muted" />
            <p className="text-sm text-muted">No icons match "{search}"</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {cat.label}
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
                {cat.icons.map(({ name, Icon }) => {
                  const isCopied = copiedName === name
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleCopy(name)}
                      title={`<${name} />`}
                      className="group relative flex flex-col items-center gap-y-2 rounded-lg border border-borderColor p-3
                      text-muted transition-all duration-150
                      hover:border-white/10 hover:bg-surface-hover hover:text-foreground
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                      {isCopied ? (
                        <Check size={20} className="text-emerald-500" />
                      ) : (
                        <Icon size={20} />
                      )}
                      <span className="w-full truncate text-center text-[10px] leading-tight">
                        {name}
                      </span>
                      <span className="absolute right-1 top-1 text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <Copy size={11} />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default IconShowcase
