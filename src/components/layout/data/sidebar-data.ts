import {
  ChartNoAxesCombined,
  ClipboardCheck,
  ListTodo,
  Lock,
  LogIn,
  Mail,
  MailQuestion,
  MessageCircleMore,
  RefreshCcwDot,
  ScanLine,
  CircleQuestionMark,
  Box,
  ChartPie,
  Pyramid,
  Table,
  RectangleEllipsis,
  Palette,
} from 'lucide-react'

export type SidebarChild = {
  title: string
  href: string
}

export type SidebarItem = {
  id: string
  title: string
  icon?: typeof ChartNoAxesCombined
  href?: string
  type?: 'group' | 'simple'
  children?: SidebarChild[] | SidebarItem[]
}

export const sidebar_data: SidebarItem[] = [
  {
    id: 'main-group',
    title: 'Main',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: ChartNoAxesCombined,
        href: '/',
        children: [],
      },
    ],
  },
  {
    id: 'Apps',
    title: 'Projects',
    type: 'group',
    children: [
      {
        id: 'to-do-list',
        title: 'To Do List',
        icon: ListTodo,
        href: '/to-do-list',
        children: [],
      },
      {
        id: 'chat-app',
        title: 'Chat',
        icon: MessageCircleMore,
        href: '/chat',
        children: [],
      },
      {
        id: 'task-management',
        title: 'Task Management',
        icon: ClipboardCheck,
        href: '/task-management',
        children: [],
      },
      {
        id: 'mail-box',
        title: 'Mailbox',
        icon: Mail,
        href: '/mail-box',
        children: [],
      },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    children: [
      {
        id: 'login',
        title: 'Login',
        icon: LogIn,
        href: '',
        children: [
          {
            title: 'Cover',
            href: '/login-cover',
          },
          {
            title: 'Basic',
            href: '/login-basic',
          },
        ],
      },
      {
        id: 'register',
        title: 'Register',
        icon: ScanLine,
        children: [
          {
            title: 'Cover',
            href: '/register-cover',
          },
          {
            title: 'Basic',
            href: '/register-basic',
          },
        ],
      },
      {
        id: 'forgot-password',
        title: 'Forgot Password',
        icon: CircleQuestionMark,
        children: [
          {
            title: 'Cover',
            href: '/forgotPassword-cover',
          },
          {
            title: 'Basic',
            href: '/forgotPassword-basic',
          },
        ],
      },
      {
        id: 'email-verification',
        title: 'Email Verification',
        icon: MailQuestion,
        children: [
          {
            title: 'Cover',
            href: '/emailVerification-cover',
          },
          {
            title: 'Basic',
            href: '/emailVerification-basic',
          },
        ],
      },
      {
        id: 'reset-password',
        title: 'Reset Password',
        icon: RefreshCcwDot,
        children: [
          {
            title: 'Cover',
            href: '/reset-cover',
          },
          {
            title: 'Basic',
            href: '/reset-basic',
          },
        ],
      },
      {
        id: 'lock-screen',
        title: 'Lock Screen',
        icon: Lock,
        href: '/lock-screen',
        type: 'simple',
        children: [],
      },
    ],
  },
  {
    id: 'user-interface',
    title: 'User Interface',
    type: 'group',
    children: [
      {
        id: 'components',
        title: 'Components',
        icon: Palette,
        href: '',
        children: [
          {
            title: 'Modals',
            href: '/modals',
          },
          {
            title: 'Tabs',
            href: '/tabs',
          },
          {
            title: 'Accordions',
            href: '/accordions',
          },
          {
            title: 'Cards',
            href: '/cards',
          },
        ],
      },
      {
        id: 'element',
        title: 'Element',
        icon: Box,
        href: '',
        children: [
          {
            title: 'Buttons',
            href: '/buttons',
          },
          {
            title: 'Dropdowns',
            href: '/dropdown',
          },
          {
            title: 'Loaders',
            href: '/loader',
          },
          {
            title: 'Pagination',
            href: '/pagination',
          },
          {
            title: 'Tooltips',
            href: '/tooltips',
          },
        ],
      },
      // <ScanBox />
      {
        id: 'charts',
        title: 'Charts',
        icon: ChartPie,
        href: '/charts',
        type: 'simple',
        children: [],
      },
      {
        id: 'icons',
        title: 'Icons',
        icon: Pyramid,
        href: '/icons',
        type: 'simple',
        children: [],
      },
    ],
  },
  {
    id: 'table-and-forms',
    title: 'Tables and Forms',
    type: 'group',
    children: [
      {
        id: 'tables',
        title: 'Tables',
        icon: Table,
        href: '/tables',
        children: [],
      },
      {
        id: 'forms',
        title: 'Forms',
        icon: RectangleEllipsis,
        href: '/forms',
        children: [
          {
            title: 'Modals',
            href: '/modals-',
          },
          {
            title: 'Tabs',
            href: '/tabs-',
          },
        ],
      },
    ],
  },
]
