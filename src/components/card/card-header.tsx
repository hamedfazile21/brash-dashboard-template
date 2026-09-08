import type { ReactNode } from "react";
import { useCardContext, type CardView } from "./card-provider";

const headerViewClasses: Record<CardView, string> = {
  default: 'relative z-10 flex items-center justify-between border-b border-borderColor p-4',
  stat: 'relative z-10 flex flex-col',
  media: 'p-4 pb-0',
  hover: '', // hover view has no header — Media + Content only
  horizontal: '', // content column holds everything for this view
  profile: '', // avatar + title + description are centered directly
}
 
export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { view } = useCardContext()
  return <div className={`${headerViewClasses[view]} ${className}`}>{children}</div>
}