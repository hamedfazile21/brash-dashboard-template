import { FadeLoader } from 'react-spinners'

export function SplashScreen() {
  const PRIMARY = 'var(--color-primary)'

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <FadeLoader
          color={PRIMARY}
          height={12}
          width={5}
          radius={2}
          margin={-8}
        />

        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
