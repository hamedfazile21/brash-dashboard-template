import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EmptyMessagesConversation = ({ name }: { name: string }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-3 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MessageCircle size={26} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          {t('No messages yet')}
        </h3>
        <p className="max-w-xs text-xs text-muted">
          {t('Say hello to {{name}} to start the conversation', { name })}
        </p>
      </div>
    </div>
  )
}
export default EmptyMessagesConversation
