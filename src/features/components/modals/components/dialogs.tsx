import { useModal } from './modal-provider'
import BasicModal from './basic-modal'
import ConfirmModal from './confirm-modal'
import DrawerModal from './drawer-modal'
import FormModal from './form-modal'
import ScrollModal from './scroll-modal'
import SizeModal from './size-modal'
import SuccessModal from './success-modal'
import TopModal from './top-modal'
import TransitionModal from './transition-modal'

/** Every demo dialog, mounted once; only the active one is open */
function Dialogs() {
  const { open, openModal, close, activeTransition, activeSize } = useModal()

  // Close, wait for the exit animation, then open again to replay the entrance
  const replay = () => {
    close()
    setTimeout(() => openModal('transition'), 350)
  }

  return (
    <>
      <BasicModal open={open === 'basic'} onClose={close} />
      <ConfirmModal open={open === 'confirmation'} onClose={close} />
      <FormModal open={open === 'form'} onClose={close} />
      <TopModal open={open === 'top'} onClose={close} />
      <SuccessModal open={open === 'success'} onClose={close} />
      <DrawerModal open={open === 'drawer'} onClose={close} />
      <ScrollModal open={open === 'scroll'} onClose={close} />
      <TransitionModal
        open={open === 'transition'}
        onClose={close}
        onReplay={replay}
        variant={activeTransition}
      />
      <SizeModal open={open === 'size'} onClose={close} size={activeSize} />
    </>
  )
}

export default Dialogs
