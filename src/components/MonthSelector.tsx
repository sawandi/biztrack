
type MonthSelectorProps = {
  selectedMonth: string
  onPreviousMonth: () => void
  onNextMonth: () => void
}

function MonthSelector({
  selectedMonth,
  onPreviousMonth,
  onNextMonth,
}: MonthSelectorProps) {
  const formattedMonth = new Date(
    `${selectedMonth}-01T12:00:00`,
  ).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const currentMonth = new Date().toISOString().slice(0, 7)

  const isCurrentMonth = selectedMonth >= currentMonth

  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="cursor-pointer rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
        aria-label="Previous month"
      >
        ←
      </button>

      <h3 className="text-base font-semibold text-gray-800">
        {formattedMonth}
      </h3>

      <button
        type="button"
        onClick={onNextMonth}
        className="cursor-pointer rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next month"
        disabled = {isCurrentMonth}
      >
        →
      </button>
    </div>
  )
}

export default MonthSelector
