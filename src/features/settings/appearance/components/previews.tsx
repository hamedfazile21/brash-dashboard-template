import type {
  MainWidth,
  PaletteToken,
} from '#/features/theme/slice/theme-types'

/*
 * Miniature dashboards drawn with plain divs. Theme previews use fixed
 * light/dark palettes so they look right whatever the current theme is;
 * the accent always follows the live --color-primary.
 */

type Palette = {
  background: string
  surface: string
  line: string
  text: string
}

const lightPalette: Palette = {
  background: 'rgb(250 250 252)',
  surface: 'rgb(239 241 246)',
  line: 'rgb(219 219 219)',
  text: 'rgb(203 213 225)',
}

/** Maps real dark tokens onto the preview's simplified palette */
export function paletteFromTokens(
  tokens: Record<PaletteToken, string>,
): Palette {
  return {
    background: tokens.background,
    surface: tokens.surface,
    line: tokens.surfaceHover,
    text: `color-mix(in srgb, ${tokens.mutedForeground} 45%, ${tokens.surface})`,
  }
}

export function MiniDashboard({ palette }: { palette: Palette }) {
  const { background, surface, line, text } = palette

  return (
    <div className="flex h-full w-full" style={{ background }}>
      <div
        className="flex w-1/4 flex-col gap-y-1.5 p-2"
        style={{ background: surface, borderInlineEnd: `1px solid ${line}` }}
      >
        <span className="mb-1 size-2.5 rounded-full bg-primary" />
        <span className="h-1.5 rounded-full bg-primary/70" />
        <span
          className="h-1.5 w-4/5 rounded-full"
          style={{ background: text }}
        />
        <span
          className="h-1.5 w-3/5 rounded-full"
          style={{ background: text }}
        />
        <span
          className="h-1.5 w-4/5 rounded-full"
          style={{ background: text }}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div
          className="flex h-4 items-center justify-end gap-x-1 px-2"
          style={{ borderBottom: `1px solid ${line}` }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: text }}
          />
          <span
            className="size-1.5 rounded-full"
            style={{ background: text }}
          />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="flex flex-col justify-end gap-y-1 rounded-md p-1.5"
              style={{ background: surface }}
            >
              <span
                className="h-1 w-3/5 rounded-full"
                style={{ background: text }}
              />
              <span
                className={`h-1.5 rounded-full ${i === 0 ? 'bg-primary' : ''}`}
                style={i === 0 ? undefined : { background: text }}
              />
            </span>
          ))}
          <span
            className="col-span-3 flex items-end gap-x-1 rounded-md p-1.5"
            style={{ background: surface }}
          >
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-primary/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ThemePreview({
  mode,
  darkTokens,
}: {
  mode: 'light' | 'dark' | 'system'
  /** The active dark palette, so the Dark/System cards match it */
  darkTokens: Record<PaletteToken, string>
}) {
  const darkPalette = paletteFromTokens(darkTokens)

  if (mode !== 'system') {
    return (
      <div className="aspect-16/10 w-full">
        <MiniDashboard
          palette={mode === 'light' ? lightPalette : darkPalette}
        />
      </div>
    )
  }

  // System: light and dark split on a diagonal
  return (
    <div className="relative aspect-16/10 w-full">
      <div className="absolute inset-0">
        <MiniDashboard palette={lightPalette} />
      </div>
      <div
        className="absolute inset-0"
        style={{ clipPath: 'polygon(62% 0, 100% 0, 100% 100%, 38% 100%)' }}
      >
        <MiniDashboard palette={darkPalette} />
      </div>
    </div>
  )
}

export function SidebarPreview({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex aspect-16/10 w-full bg-background">
      <div
        className={`flex flex-col gap-y-1.5 border-e border-borderColor bg-surface p-2 transition-all ${
          collapsed ? 'w-[14%] items-center' : 'w-[34%]'
        }`}
      >
        <span className="mb-1 size-2.5 shrink-0 rounded-full bg-primary" />
        {[100, 75, 85, 60, 80].map((w, i) =>
          collapsed ? (
            <span
              key={i}
              className={`size-2 shrink-0 rounded-sm ${i === 0 ? 'bg-primary/70' : 'bg-muted/30'}`}
            />
          ) : (
            <span key={i} className="flex items-center gap-x-1">
              <span
                className={`size-2 shrink-0 rounded-sm ${i === 0 ? 'bg-primary/70' : 'bg-muted/30'}`}
              />
              <span
                className={`h-1.5 rounded-full ${i === 0 ? 'bg-primary/70' : 'bg-muted/30'}`}
                style={{ width: `${w}%` }}
              />
            </span>
          ),
        )}
      </div>
      <div className="flex flex-1 flex-col gap-y-1.5 p-2">
        <span className="h-3 rounded-md bg-surface" />
        <span className="flex-1 rounded-md bg-surface" />
      </div>
    </div>
  )
}

const widthPercent: Record<MainWidth, number> = {
  '5xl': 52,
  '6xl': 64,
  '7xl': 76,
  full: 100,
}

export function WidthPreview({ width }: { width: MainWidth }) {
  return (
    <div className="flex aspect-16/10 w-full flex-col bg-background">
      <span className="h-3 shrink-0 border-b border-borderColor bg-surface" />
      <div className="flex flex-1 justify-center p-2">
        <div
          className="relative flex flex-col gap-y-1 rounded-md border border-dashed border-primary/60 bg-primary/5 p-1.5 transition-all duration-300"
          style={{ width: `${widthPercent[width]}%` }}
        >
          <span className="h-1.5 w-1/2 rounded-full bg-primary/60" />
          <span className="grid flex-1 grid-cols-2 gap-1">
            <span className="rounded-sm bg-surface" />
            <span className="rounded-sm bg-surface" />
          </span>
        </div>
      </div>
    </div>
  )
}
