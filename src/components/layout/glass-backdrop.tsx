import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../assets'

/** Fixed blobs + faded grid behind full-screen pages (auth, 404, 500, …) */
function GlassBackdrop() {
  return (
    <>
      <img
        src={GlassBlob1}
        alt=""
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <img
        src={GlassBlob}
        alt=""
        aria-hidden
        className="pointer-events-none fixed top-1/4 right-1/4 -z-10 size-112 opacity-40 dark:opacity-20"
      />
      <img
        src={GlassBlob2}
        alt=""
        aria-hidden
        className="pointer-events-none fixed -right-24 -bottom-32 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Subtle grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] opacity-50 mask-[radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
    </>
  )
}

export default GlassBackdrop
