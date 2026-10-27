import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ObjectViewerProps {
  data: unknown
  className?: string
}

/**
 * Lightweight display for a JS object/form result as formatted JSON.
 * No external syntax-highlighting library needed — just
 * JSON.stringify + a small regex pass to colorize tokens.
 */
export function ObjectViewer({ data, className = '' }: ObjectViewerProps) {
  const {t} = useTranslation()
  const [copied, setCopied] = useState(false)

  const json = JSON.stringify(data, null, 2)

  // Colorize JSON tokens: keys, strings, numbers, booleans/null
  const highlighted = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'text-amber-500' // numbers
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'text-primary' : 'text-emerald-500' // keys vs string values
        } else if (/true|false/.test(match)) {
          cls = 'text-blue-500'
        } else if (/null/.test(match)) {
          cls = 'text-red-400'
        }
        return `<span class="${cls}">${match}</span>`
      },
    )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-gray-800 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={t('Copy JSON')}
        className="absolute top-3 z-10 flex items-center gap-x-1 rounded-md border border-white/10
          bg-surface px-2 py-1 text-xs text-muted opacity-0 backdrop-blur-md
          transition-all duration-150 ease-out
          hover:bg-surface-hover hover:text-primary
          focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
          group-hover:opacity-100
          right-3"
      >
        {copied ? (
          <>
            <Check size={13} className="text-emerald-500" />
            {t('Copied')}
          </>
        ) : (
          <>
            <Copy size={13} />
            {t('Copy')}
          </>
        )}
      </button>

      {/* dir="ltr" forced regardless of page direction — JSON/code must never
          follow RTL bidi reordering, or brackets/colons/punctuation can render
          visually scrambled even though the underlying text is correct. */}
      <pre dir="ltr" className="overflow-x-auto p-4 text-left text-sm leading-relaxed">
        <code
          className="font-mono text-foreground"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}

export default ObjectViewer

