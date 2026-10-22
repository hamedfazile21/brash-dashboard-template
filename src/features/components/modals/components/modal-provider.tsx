import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  Sparkles,
  ZoomIn,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { DialogSize } from '#/components/dialog'

export type ModalDialogType =
  | 'transition'
  | 'basic'
  | 'confirmation'
  | 'form'
  | 'top'
  | 'success'
  | 'drawer'
  | 'scroll'
  | 'size'

export type TransitionVariant =
  | 'fadeIn'
  | 'slideInDown'
  | 'fadeInUp'
  | 'slideInUp'
  | 'fadeInLeft'
  | 'rotateInLeft'
  | 'fadeInRight'
  | 'zoomInUp'

export type Size = Extract<
  DialogSize,
  'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full'
>

export interface TransitionOption {
  variant: TransitionVariant
  label: string
  icon: LucideIcon
  /** Hover hint on the preview tile — static strings so Tailwind sees them */
  hoverMotion: string
}

export interface SizeOption {
  size: Size
  label: string
  /** The panel's max width, as shown to the user */
  width: string
  /** Bar length on the size ruler, relative to "full" */
  ruler: string
}

export const transitionOptions: TransitionOption[] = [
  {
    variant: 'fadeIn',
    label: 'Fade In',
    icon: Sparkles,
    hoverMotion: 'group-hover:opacity-20',
  },
  {
    variant: 'slideInDown',
    label: 'Slide Down',
    icon: ArrowDown,
    hoverMotion: 'group-hover:-translate-y-3 group-hover:opacity-40',
  },
  {
    variant: 'fadeInUp',
    label: 'Fade Up',
    icon: ArrowUp,
    hoverMotion: 'group-hover:translate-y-2 group-hover:opacity-40',
  },
  {
    variant: 'slideInUp',
    label: 'Slide Up',
    icon: ArrowUp,
    hoverMotion: 'group-hover:translate-y-4 group-hover:opacity-40',
  },
  {
    variant: 'fadeInLeft',
    label: 'Fade Left',
    icon: ArrowLeft,
    hoverMotion: 'group-hover:-translate-x-3 group-hover:opacity-40',
  },
  {
    variant: 'rotateInLeft',
    label: 'Rotate Left',
    icon: RotateCcw,
    hoverMotion:
      'group-hover:-rotate-12 group-hover:-translate-x-2 group-hover:opacity-50',
  },
  {
    variant: 'fadeInRight',
    label: 'Fade Right',
    icon: ArrowRight,
    hoverMotion: 'group-hover:translate-x-3 group-hover:opacity-40',
  },
  {
    variant: 'zoomInUp',
    label: 'Zoom Up',
    icon: ZoomIn,
    hoverMotion:
      'group-hover:scale-75 group-hover:translate-y-2 group-hover:opacity-40',
  },
]

export const sizeOptions: SizeOption[] = [
  { size: 'sm', label: 'Small', width: '24rem', ruler: 'w-[30%]' },
  { size: 'md', label: 'Medium', width: '28rem', ruler: 'w-[35%]' },
  { size: 'lg', label: 'Large', width: '32rem', ruler: 'w-[40%]' },
  { size: 'xl', label: 'Extra large', width: '36rem', ruler: 'w-[45%]' },
  { size: '2xl', label: '2× large', width: '42rem', ruler: 'w-[53%]' },
  { size: '4xl', label: '4× large', width: '56rem', ruler: 'w-[70%]' },
  { size: 'full', label: 'Full width', width: '100%', ruler: 'w-full' },
]

interface ModalContextType {
  open: ModalDialogType | null
  openModal: (modal: ModalDialogType) => void
  close: () => void
  activeTransition: TransitionVariant
  setActiveTransition: (variant: TransitionVariant) => void
  activeSize: Size
  setActiveSize: (size: Size) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ModalDialogType | null>(null)
  const [activeTransition, setActiveTransition] =
    useState<TransitionVariant>('fadeIn')
  const [activeSize, setActiveSize] = useState<Size>('md')

  return (
    <ModalContext.Provider
      value={{
        open,
        openModal: setOpen,
        close: () => setOpen(null),
        activeTransition,
        setActiveTransition,
        activeSize,
        setActiveSize,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const modalContext = useContext(ModalContext)

  if (!modalContext) {
    throw new Error('useModal has to be used within <ModalProvider>')
  }

  return modalContext
}
