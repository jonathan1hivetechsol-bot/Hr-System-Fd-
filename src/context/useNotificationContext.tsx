import type { BootstrapVariantType, ChildrenType } from '@/types/component-props'
import { useState } from 'react'
import { ToastBody, ToastHeader } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { NotificationContext } from './NotificationContext'

type ShowNotificationType = {
  title?: string
  message: string
  variant?: BootstrapVariantType
  delay?: number
}

type ToastrProps = {
  show: boolean
  onClose?: () => void
} & ShowNotificationType

export type NotificationContextType = {
  showNotification: ({ title, message, variant }: ShowNotificationType) => void
}

function Toastr({ show, title, message, onClose, variant = 'light', delay }: Readonly<ToastrProps>) {
  return (
    <ToastContainer className="m-3 position-fixed" position="top-end">
      <Toast bg={variant} delay={delay} show={show} onClose={onClose} autohide>
        {title && (
          <ToastHeader className={`text-${variant}`}>
            <strong className="me-auto">{title}</strong>
          </ToastHeader>
        )}
        <ToastBody className={['dark', 'danger', 'success', 'primary'].includes(variant) ? 'text-white' : ''}>{message}</ToastBody>
      </Toast>
    </ToastContainer>
  )
}

export function NotificationProvider({ children }: ChildrenType) {
  const defaultConfig = {
    show: false,
    message: '',
    title: '',
    delay: 2000,
  }

  const [config, setConfig] = useState<ToastrProps>(defaultConfig)
  const hideNotification = () => {
    setConfig({ show: false, message: '', title: '' })
  }

  const showNotification = ({ title, message, variant, delay = 2000 }: ShowNotificationType) => {
    setConfig({
      show: true,
      title,
      message,
      variant: variant ?? 'light',
      onClose: hideNotification,
      delay,
    })

    setTimeout(() => {
      setConfig(defaultConfig)
    }, delay)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Toastr {...config} />
      {children}
    </NotificationContext.Provider>
  )
}
