import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar30,
  Avatar4,
  Avatar5,
} from '../../../assets'

export type Priority = 'Low' | 'Medium' | 'High'
export type TodoStatus = 'complete' | 'pending' | 'trashed'

export interface TodoType {
  id: number
  title: string
  assignee: string
  priority: Priority
  description: string
  date: string
  status: TodoStatus
  isImportant: boolean
}
export const todoData: TodoType[] = [
  {
    id: 1,
    title: 'Design Login Page',
    assignee: Avatar1,
    priority: 'High',
    description:
      'Create a responsive login page with email/password fields and social login buttons.',
    date: '05 Aug 2026',
    status: 'complete',
    isImportant: true,
  },
  {
    id: 2,
    title: 'Implement Authentication',
    assignee: Avatar2,
    priority: 'High',
    description:
      'Integrate JWT authentication and refresh token functionality.',
    date: '08 Aug 2026',
    status: 'pending',
    isImportant: true,
  },
  {
    id: 3,
    title: 'Fix Dashboard Layout',
    assignee: Avatar30,
    priority: 'Medium',
    description:
      'Resolve responsive issues affecting tablet and mobile screen sizes.',
    date: '09 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 4,
    title: 'Write API Documentation',
    assignee: Avatar4,
    priority: 'Low',
    description:
      'Document all REST API endpoints with request and response examples.',
    date: '10 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 6,
    title: 'Optimize Images',
    assignee: Avatar1,
    priority: 'Low',
    description: 'Compress dashboard images to improve loading performance.',
    date: '12 Aug 2026',
    status: 'complete',
    isImportant: false,
  },
  {
    id: 7,
    title: 'Add Dark Mode',
    assignee: Avatar5,
    priority: 'Medium',
    description: 'Implement a theme switcher with persistent user preferences.',
    date: '14 Aug 2026',
    status: 'pending',
    isImportant: true,
  },
  {
    id: 8,
    title: 'Create User Profile',
    assignee: Avatar2,
    priority: 'Medium',
    description:
      'Develop profile page with avatar upload and editable personal information.',
    date: '16 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 9,
    title: 'Review Pull Requests',
    assignee: Avatar3,
    priority: 'High',
    description:
      'Review pending pull requests and provide feedback before merging.',
    date: '17 Aug 2026',
    status: 'complete',
    isImportant: true,
  },
  {
    id: 10,
    title: 'Setup Unit Tests',
    assignee: Avatar4,
    priority: 'High',
    description: 'Add Jest and React Testing Library for component testing.',
    date: '18 Aug 2026',
    status: 'pending',
    isImportant: true,
  },
  {
    id: 11,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 12,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 13,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 14,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 15,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 16,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
  {
    id: 17,
    title: 'Deploy Staging Version',
    assignee: Avatar5,
    priority: 'Low',
    description:
      'Deploy the latest build to the staging environment for QA testing.',
    date: '20 Aug 2026',
    status: 'pending',
    isImportant: false,
  },
]
