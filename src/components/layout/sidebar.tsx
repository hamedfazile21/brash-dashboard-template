import { ChevronFirst, ChevronRight, Dot } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { sidebar_data, type SidebarChild } from './data/sidebar-data'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { toggleSidebar } from '#/features/theme/slice/theme-slice'
import Tooltip from '../tooltip'
import { Transition } from '@headlessui/react'
import {
  LogoDark,
  LogoDarkRow,
  LogoLight,
  LogoLightRow,
} from '../../../public/assets'
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react'
const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const [openItem, setOpenItem] = useState<string | null>(null)
  const { sidebarStatus, direction, themeMode } = useAppSelector(
    (state) => state.themeConfig,
  )
  const navigate = useNavigate()
  const [submenuActiveTab, setSubmenuActiveTab] = useState<string>('')

  const getTruncatedTitle = (title: string) => {
    const limit = sidebarStatus === 'collapsible-vertical' ? 7 : 20
    return title.length > limit ? `${title.slice(0, limit)}...` : title
  }

  const toggleItem = (id: string) => {
    if (sidebarStatus === 'collapsible-vertical') {
      setSubmenuActiveTab(id)
    }
    setOpenItem((current) => (current === id ? null : id))
  }

  const isRouteActive = (href?: string) => {
    if (!href) return false

    const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '')
    const normalizedPath =
      location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')

    if (normalizedHref === '/') {
      return normalizedPath === '/'
    }

    return (
      normalizedPath === normalizedHref ||
      normalizedPath.startsWith(`${normalizedHref}/`)
    )
  }

  const handedToggleSidebar = () => {
    setSubmenuActiveTab('')
    if (sidebarStatus === 'collapsible-vertical') {
      dispatch(toggleSidebar('vertical'))
    } else {
      dispatch(toggleSidebar('collapsible-vertical'))
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      // Tailwind `md` range is 768px to 1023px (before `lg` at 1024px)
      if (width >= 768 && width < 1024) {
        dispatch(toggleSidebar('collapsible-vertical'))
      }
    }

    window.addEventListener('resize', handleResize)

    // Clean up listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderSubNavItem = (item: any) => {
    const titleMessage = getTruncatedTitle(item.title)
    return (
      <div className="flex flex-col gap-y-1">
        {sidebarStatus === 'collapsible-vertical' && (
          <p className="mb-1 flex items-center gap-x-3 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {titleMessage !== item.title ? (
              <Tooltip placement="right" content={item.title}>
                <button
                  type="button"
                  className="truncate uppercase tracking-[0.2em] hover:text-primary transition-colors"
                >
                  {titleMessage}
                </button>
              </Tooltip>
            ) : (
              <span className="truncate">{titleMessage}</span>
            )}
          </p>
        )}

        {item.children?.map((child: SidebarChild) => {
          const isChildActive = isRouteActive(child.href)

          return (
            <Link
              key={child.href}
              to={child.href}
              onClick={() => setOpenItem(null)}
              aria-current={isChildActive ? 'page' : undefined}
              className={`group relative flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
          ${
            isChildActive
              ? 'bg-primary/10 font-medium text-primary'
              : 'text-muted hover:bg-surface-hover hover:text-primary'
          }`}
            >
              <Dot
                size={20}
                className={`shrink-0 transition-all duration-200 ${
                  isChildActive
                    ? 'text-primary scale-110'
                    : 'text-muted/50 group-hover:text-primary/70'
                }`}
              />
              <span className="truncate">{t(child.title)}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  const renderNavItem = (item: any) => {
    const Icon = item.icon
    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const isOpen = openItem === item.id
    const isFlyoutOpen = submenuActiveTab === item.id
    const titleLabel = getTruncatedTitle(t(item.title))
    const isParentActive =
      isRouteActive(item.href) ||
      (hasChildren &&
        item.children?.some((child: any) => isRouteActive(child.href)))

    // Floating UI computes real viewport coordinates for the flyout,
    // anchored to the trigger button — this is what lets it escape the
    // sidebar's scroll-container clipping entirely, instead of relying
    // on CSS absolute/fixed positioning that gets clipped by any
    // scrollable ancestor.
    const { refs, floatingStyles } = useFloating({
      open: isFlyoutOpen,
      placement: direction === 'ltr' ? 'right-start' : 'left-start',
      whileElementsMounted: autoUpdate, // repositions on scroll/resize automatically
      middleware: [offset(8), flip(), shift({ padding: 8 })],
    })

    return (
      <div key={item.id} className="relative">
        {/* <Tooltip
          className={sidebarStatus !== 'vertical' ? '' : 'hidden'}
          content={t(item.title)}
          placement={direction === 'ltr' ? 'left' : 'right'}
        >
         
        </Tooltip> */}

        <button
          ref={refs.setReference}
          type="button"
          onClick={() =>
            hasChildren ? toggleItem(item.id) : navigate({ to: item.href })
          }
          className={`group relative flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-1.75 transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
          ${sidebarStatus === 'collapsible-vertical' && 'mb-1 min-h-14.5 flex-col items-center justify-center gap-y-1 p-1'}
          ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
          ${isParentActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-surface hover:text-primary'}`}
        >
          <div
            className={`flex ${
              sidebarStatus === 'collapsible-vertical'
                ? 'flex-col items-center justify-center gap-y-1'
                : 'items-center gap-x-2'
            }`}
          >
            <div
              className={`flex items-center justify-center transition-transform duration-200 ${
                isParentActive ? 'scale-105' : 'group-hover:scale-105'
              }`}
            >
              <Icon size={18} />
            </div>
            <span
              className={`max-w-full truncate font-medium transition-colors ${
                sidebarStatus === 'collapsible-vertical'
                  ? 'text-center text-[10px] leading-3'
                  : 'text-sm'
              }`}
            >
              {t(titleLabel)}
            </span>
          </div>

          {hasChildren ? (
            <ChevronRight
              size={18}
              className={`shrink-0 transition-transform duration-200 ease-out ${
                sidebarStatus === 'collapsible-vertical' ? 'hidden' : ''
              } ${isOpen ? 'rotate-90' : 'ltr:rotate-0 rtl:rotate-180'}`}
            />
          ) : null}

          {hasChildren ? (
            <ChevronRight
              size={18}
              className={`absolute rtl:-left-1.5 ltr:-right-1.5 -bottom-1.5  rotate-45 shrink-0 transition-color duration-200 ease-out ${
                sidebarStatus !== 'collapsible-vertical' && 'hidden'
              }`}
            />
          ) : null}
        </button>

        {/* inline submenu (expanded sidebar) */}
        {hasChildren && sidebarStatus !== 'collapsible-vertical' && (
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0 mt-1">{renderSubNavItem(item)}</div>
          </div>
        )}

        {/* flyout submenu (collapsed sidebar) */}
        <FloatingPortal>
          <Transition
            static
            show={isFlyoutOpen}
            enter="transition-opacity duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-100 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="card z-50 w-55 origin-top p-1.5! [contain:layout_paint] will-change-transform"
            >
              {renderSubNavItem(item)}
            </div>
          </Transition>
        </FloatingPortal>
      </div>
    )
  }

  useEffect(() => {
    if (sidebarStatus === 'collapsible-vertical') {
      setOpenItem(null)
      return
    }

    const allItems = sidebar_data.flatMap((item: any) =>
      item.type === 'group' ? (item.children ?? []) : [item],
    )

    const activeParent = allItems.find((item: any) => {
      if (item.href && isRouteActive(item.href)) {
        return true
      }

      return item.children?.some((child: any) => isRouteActive(child.href))
    })

    if (activeParent?.id) {
      setOpenItem(activeParent.id)
    }
  }, [location.pathname, sidebarStatus])

  useEffect(() => {
    if (sidebarStatus !== 'collapsible-vertical') return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (sidebarRef.current?.contains(target)) {
        return
      }

      setOpenItem(null)
      setSubmenuActiveTab('')
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [sidebarStatus])

  return (
    <div
      ref={sidebarRef}
      className={`sticky top-0 h-screen shrink-0 overflow-hidden transition-all duration-300 ${sidebarStatus === 'vertical' ? 'w-75' : 'w-22 p-0!'} ltr:border-r rtl:border-l border-borderColor`}
    >
      <div
        className={`flex h-14 items-center ${sidebarStatus === 'collapsible-vertical' && 'justify-center'}  border-b border-borderColor bg-surface/40 px-3 py-1 backdrop-blur-xl backdrop-saturate-150`}
      >
        {sidebarStatus === 'vertical' ? (
          <>
            {themeMode === 'dark' ? (
              <img src={LogoDarkRow} className="w-32.5" />
            ) : (
              <img src={LogoLightRow} className="w-32.5" />
            )}
          </>
        ) : (
          <>
            {themeMode === 'dark' ? (
              <img src={LogoDark} className="size-10" />
            ) : (
              <img src={LogoLight} className="size-10" />
            )}
          </>
        )}
      </div>

      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden p-2 pb-13">
        <div className="flex flex-col">
          {sidebar_data.map((item, index) => {
            if (item.type === 'group') {
              return (
                <div key={index} className="first:mt-0">
                  {sidebarStatus === 'vertical' && (
                    <div
                      className={`${index !== 0 && 'mt-2 '} flex items-center gap-x-3 px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400`}
                    >
                      <div className="w-fit">{t(item.title)}</div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    {item.children?.map((child: any) => renderNavItem(child))}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>

      <div>
        <button
          onClick={handedToggleSidebar}
          className={`hidden lg:block absolute bottom-3 ${sidebarStatus === 'vertical' ? 'ltr:right-3 rtl:left-3' : 'ltr:right-6 rtl:left-6'} rounded-full border border-borderColor bg-background p-2 text-foreground shadow-sm transition hover:bg-surface-hover hover:text-primary`}
        >
          <ChevronFirst
            className={`transition-transform duration-300 ${sidebarStatus === 'collapsible-vertical' ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
