import { useEffect } from 'react'

export type ToastType = 'success' | 'error'

type ToastProps = {
  message: string
  type: ToastType
  onClose: () => void
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onClose])

  const isSuccess = type === 'success'

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={`fixed right-5 top-5 z-50 flex items-center gap-4 rounded-xl border px-6 py-5 shadow-xl ${
        isSuccess
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-red-200 bg-red-50 text-red-800'
        }`}
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
            <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                >
                {/* Circle */}
                <circle cx="12" cy="12" r="9" />

                {/* Centered checkmark */}
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.5 12l2.3 2.3 4.7-4.7"
                />
            </svg>
        ) : (
            <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.73 3h16.9a2 2 0 001.73-3L15.71 3.86a2 2 0 00-3.42 0z"
            />
            </svg>
        )}

        <span className="text-base font-semibold">{message}</span>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-2xl leading-none opacity-60 transition hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
