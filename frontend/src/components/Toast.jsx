import { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose?.()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [onClose])

  return (
    <div className={`toast ${type}`} role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  )
}

export default Toast
