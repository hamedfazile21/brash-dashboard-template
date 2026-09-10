import {
  CircleUser,
  Globe,
  LaptopMinimal,
  LogOut,
  Mail,
  Moon,
  Settings,
  Sun,
  User,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDirection,
  changeLanguage,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import type { ThemeMode } from '#/features/theme/slice/theme-types'
import { AfghanistanFlag, EnglishFlag, UserPNG } from '../../../public/assets'
import i18n from '#/app/i18n'
import { useNavigate } from '@tanstack/react-router'
import { HeaderSearchTrigger, useHeaderSearch } from './header-search-trigger'
import Popover from '../popover'
const Header = () => {
  const { searchOpen, setSearchOpen } = useHeaderSearch()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    themeConfig: { themeMode, direction, language },
  } = useAppSelector((state) => state)
  const { t } = useTranslation()
  const handelChangeTheme = (theme: ThemeMode) => {
    dispatch(toggleTheme(theme))
  }
  const handelChangeLanguage = (language: string) => {
    if (language === 'fa') {
      dispatch(changeDirection('rtl'))
      dispatch(changeLanguage('farsi'))
      i18n.changeLanguage('fa')
    } else {
      dispatch(changeDirection('ltr'))
      dispatch(changeLanguage('english'))
      i18n.changeLanguage('en')
    }
  }

  const themeData = [
    {
      className: `${themeMode === 'light' ? 'bg-surface-hover' : 'hover:bg-surface-hover'}`,
      onClick: () => handelChangeTheme('light'),
      title: 'Light',
      icon: <Sun size={18} />,
    },
    {
      className: `${themeMode === 'dark' ? 'bg-surface-hover' : 'hover:bg-surface-hover'}`,
      onClick: () => handelChangeTheme('dark'),
      title: 'Dark',
      icon: <Moon size={18} />,
    },
    {
      className: `${themeMode === 'system' ? 'bg-surface-hover' : 'hover:bg-surface-hover'}`,
      onClick: () => handelChangeTheme('system'),
      title: 'System',
      icon: <LaptopMinimal size={18} />,
    },
  ]

  const languageData = [
    {
      className: `${language === 'english' ? '!bg-surface-hover' : 'hover:bg-surface-hover'}`,
      onClick: () => handelChangeLanguage('en'),
      title: t('English'),
      icon: <img src={EnglishFlag} />,
    },
    {
      className: `${language === 'farsi' ? '!bg-surface-hover' : 'hover:bg-surface-hover'}`,
      onClick: () => handelChangeLanguage('fa'),
      title: t('Farsi'),
      icon: <img src={AfghanistanFlag} />,
    },
  ]

  const profileData = [
    {
      className: `hover:bg-surface-hover`,
      onClick: () => {},
      title: 'Profile',
      icon: <UserRound size={18} />,
    },
    {
      className: `hover:bg-surface-hover`,
      onClick: () => {},
      title: 'Inbox',
      icon: <Mail size={18} />,
    },
    {
      className: `text-danger! hover:bg-surface-hover`,
      onClick: () => {},
      title: 'Logout',
      icon: <LogOut size={18} />,
    },
  ]
  return (
    <div
      className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-borderColor
    bg-surface/40 px-5 backdrop-blur-xl backdrop-saturate-150"
    >
      <div>
        <HeaderSearchTrigger onOpen={() => setSearchOpen(true)} />
      </div>
      <div className="flex items-center gap-x-3">
        <button
          className="btn btn-secondary btn-rounded-full"
          onClick={() => navigate({ to: '.' })}
        >
          <Settings size={18} />
        </button>

        <Popover
          placement="bottom-end"
          className="w-40 "
          trigger={
            <button className="btn btn-secondary btn-rounded-full p-1! flex items-center gap-x-2 ">
              <span className="rounded-full bg-surface-hover size-6.75 flex items-center justify-center  ">
                {themeMode === 'light' ? (
                  <Sun size={18} />
                ) : themeMode === 'dark' ? (
                  <Moon size={18} />
                ) : (
                  <LaptopMinimal size={18} />
                )}
              </span>
              <span className="text-sm ltr:pr-1 rtl:pl-1">
                {themeMode.slice(0, 1).toUpperCase() + themeMode.slice(1)}
              </span>
            </button>
          }
          children={
            <div className="flex flex-col gap-y-1">
              {themeData.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`group relative flex w-full items-center gap-x-1 rounded-lg p-2 text-start text-sm text-foreground
                  transition-colors duration-150
                  data-focus:outline-hidden ${item.className}`}
                  >
                    <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-system">{t(`${item.title}`)}</span>
                  </button>
                )
              })}
            </div>
          }
        />

        <Popover
          placement="bottom-end"
          className="w-37.5"
          trigger={
            <button className="btn btn-secondary btn-rounded-full flex items-center text-foreground">
              <Globe size={18} />
            </button>
          }
          children={
            <div className="flex flex-col gap-y-1">
              {languageData.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`group relative flex w-full items-center gap-x-1 rounded-lg p-2 text-start text-sm text-foreground
                  transition-colors duration-150
                  data-focus:outline-hidden ${item.className}`}
                  >
                    <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-system">{t(`${item.title}`)}</span>
                  </button>
                )
              })}
            </div>
          }
        />

        <Popover
          placement="bottom-end"
          className="w-62.5"
          trigger={
            <button className="btn btn-secondary btn-rounded-full flex items-center text-foreground">
              <User strokeWidth={2} size={18} />
            </button>
          }
          children={
            <div className="flex flex-col gap-y-1">
              <div className="w-full flex items-center gap-x-3 border-b border-borderColor  p-2 ">
                <div>
                  <img src={UserPNG} className="size-10 rounded-full" />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="font-medium text-foreground text-md">
                    Hamed Fazeli
                  </p>
                  <p className="text-muted text-sm hover:text-blue-500 cursor-pointer hover:underline">
                    hamed@gmail.com
                  </p>
                </div>
              </div>
              {profileData.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`group relative flex w-full items-center gap-x-1 rounded-lg p-2 text-start text-sm text-foreground
                  transition-colors duration-150
                  data-focus:outline-hidden ${item.className}`}
                  >
                    <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-system">{t(`${item.title}`)}</span>
                  </button>
                )
              })}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default Header
