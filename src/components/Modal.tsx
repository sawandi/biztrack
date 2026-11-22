
import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

function Modal({
  isOpen,
  title,
  description,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-5"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {title}
            </h2>

            {description && (
              <p className="mt-2 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-2xl text-slate-600 transition hover:bg-slate-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal
