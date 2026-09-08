import Card from '#/components/card/card'
import { DollarSign, TrendingUp, Heart, Bookmark } from 'lucide-react'

function CardShowcase() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Card</h1>
        <p className="mt-1 text-sm text-muted">
          Four views, all built on the same compound Card component — only the{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            view
          </code>{' '}
          prop changes.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Default */}
        <div className="flex items-start gap-x-5">
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Default{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="default"
              </span>
            </p>
            <Card view="default" className="max-w-sm">
              <Card.Header>
                <Card.Title>Team members</Card.Title>
              </Card.Header>
              <Card.Content>
                <Card.Description>
                  Invite teammates to collaborate on this workspace. They'll get
                  access to shared projects and tasks.
                </Card.Description>
              </Card.Content>
              <Card.Footer>
                <button type="button" className="btn btn-primary w-auto px-4">
                  Invite
                </button>
              </Card.Footer>
            </Card>
          </section>

          {/* Stat */}
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Stat{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="stat"
              </span>
            </p>
            <Card view="stat" className="max-w-sm">
              <Card.Header>
                <Card.Description>Total Revenue</Card.Description>
                <Card.Title>$42,580</Card.Title>
                <span className="mt-1.5 flex items-center gap-x-1 text-xs font-medium text-emerald-500">
                  <TrendingUp size={13} />
                  +12.4% from last month
                </span>
              </Card.Header>
              <Card.Icon>
                <DollarSign size={19} />
              </Card.Icon>
            </Card>
          </section>
        </div>

        <div className="flex items-start gap-x-5">
          {/* Media */}
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Media{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="media"
              </span>
            </p>
            <Card view="media" className="max-w-sm">
              <Card.Media
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600"
                alt="Team collaborating"
              />
              <Card.Content>
                <Card.Title>Announcing the new dashboard</Card.Title>
                <Card.Description>
                  A faster, more accessible interface with full dark mode and
                  RTL support.
                </Card.Description>
              </Card.Content>
              <Card.Footer>
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read more →
                </a>
                <span className="text-xs text-muted">4 min read</span>
              </Card.Footer>
            </Card>
          </section>

          {/* Hover */}
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Hover Reveal{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="hover"
              </span>
            </p>
            <Card view="hover" className="max-w-sm">
              <Card.Media
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600"
                alt="Workspace"
              />
              <Card.Actions>
                <button
                  type="button"
                  aria-label="Like"
                  className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                >
                  <Heart size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Save"
                  className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                >
                  <Bookmark size={15} />
                </button>
              </Card.Actions>
              <Card.Content>
                <Card.Title>Minimal workspace setup</Card.Title>
                <Card.Description>
                  A calm, distraction-free desk for focused work.
                </Card.Description>
              </Card.Content>
            </Card>
          </section>
        </div>
        <div className='flex items-start gap-5'>
          {/* Horizontal */}
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Horizontal{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="horizontal"
              </span>
            </p>
            <Card view="horizontal" className="max-w-md">
              <Card.Media
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400"
                alt="Team collaborating"
              />
              <Card.Content>
                <Card.Title>Announcing the new dashboard</Card.Title>
                <Card.Description>
                  A faster, more accessible interface with full dark mode and
                  RTL support, built for teams that ship quickly.
                </Card.Description>
              </Card.Content>
            </Card>
          </section>

          {/* Profile */}
          <section className="card p-5 w-1/2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Profile{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                view="profile"
              </span>
            </p>
            <Card view="profile" className="max-w-xs">
              <Card.Avatar name="Sara Ahmadi" />
              <Card.Content>
                <Card.Title>Sara Ahmadi</Card.Title>
                <Card.Description>Product Designer</Card.Description>
              </Card.Content>
              <Card.Footer>
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Message
                </button>
                <button type="button" className="btn btn-primary w-auto px-4">
                  Follow
                </button>
              </Card.Footer>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CardShowcase
