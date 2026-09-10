import React from 'react'
import {
  HashLoader,
  BeatLoader,
  BarLoader,
  BounceLoader,
  FadeLoader,
  PropagateLoader,
  SyncLoader,
  MoonLoader,
  RotateLoader,
  ScaleLoader,
} from 'react-spinners'

const LoaderShowCase = () => {
  const PRIMARY = 'var(--color-primary)'
  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Loaders</h1>
        <p className="mt-1 text-sm text-muted">
          A set of loading indicators from{' '}
          <a
            href="https://www.davidhu.io/react-spinners/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            react-spinners
          </a>
          .
        </p>
      </div>

      <div className="pt-8 grid grid-cols-2  gap-4">
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Moon{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              MoonLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <MoonLoader color={PRIMARY} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Beat{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              BeatLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <BeatLoader color={PRIMARY} size={14} margin={3} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Bar{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              BarLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <BarLoader color={PRIMARY} width={160} height={4} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Bounce{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              BounceLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <BounceLoader color={PRIMARY} size={45} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Fade{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              FadeLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <FadeLoader
              color={PRIMARY}
              height={12}
              width={5}
              radius={2}
              margin={-8}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Propagate{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              PropagateLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <PropagateLoader color={PRIMARY} size={12} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Sync{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              SyncLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <SyncLoader color={PRIMARY} size={12} margin={4} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Rotate{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              RotateLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <RotateLoader color={PRIMARY} />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Scale{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              ScaleLoader
            </span>
          </p>
          <div className="flex items-center justify-center py-4">
            <ScaleLoader color={PRIMARY} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoaderShowCase
