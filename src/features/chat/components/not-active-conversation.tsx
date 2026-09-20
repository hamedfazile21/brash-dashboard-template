import { useTranslation } from 'react-i18next'
import { EmptyChatIllustration } from '../../../assets/illustration/EmptyChatIllustration'

const NotActiveConversation = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4 px-6 text-center">
      <EmptyChatIllustration className="h-100 w-auto" />
      <div className="flex flex-col gap-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          {t('Select a conversation')}
        </h3>
        <p className="max-w-xs text-xs text-muted">
          {t('Choose a chat from the list to see messages here')}
        </p>
      </div>
    </div>
  )
}

export default NotActiveConversation
