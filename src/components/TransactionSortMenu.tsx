
import { useState } from 'react'
import type { TransactionSortOption } from '../types/transactions'

type TransactionSortMenuProps = {
  selectedSort: TransactionSortOption
  onSortChange: (value: TransactionSortOption) => void
}

function TransactionSortMenu({
  selectedSort,
  onSortChange,
}: TransactionSortMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions: {
    value: TransactionSortOption
    label: string
  }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Amount' },
    { value: 'lowest', label: 'Lowest Amount' },
  ]

  const selectedLabel =
    sortOptions.find((option) => option.value === selectedSort)
      ?.label ?? 'Newest First'

  function handleSortChange(value: TransactionSortOption) {
    onSortChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/40"
      >
        <svg
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h16M7 12h10m-7 5h4"
          />
        </svg>

        <span className="text-gray-500">Sort:</span>
        <span className="text-gray-800">{selectedLabel}</span>

        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-52 origin-top-right animate-in fade-in zoom-in-95 duration-150 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Sort transactions
          </p>

          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSortChange(option.value)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                selectedSort === option.value
                  ? 'bg-indigo-50 font-semibold text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {option.label}

              {selectedSort === option.value && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TransactionSortMenu
