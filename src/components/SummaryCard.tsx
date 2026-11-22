type SummaryCardProps = {
  title: string
  amount: number
  type: 'income' | 'expense' | 'profit'
}

function SummaryCard({ title, amount, type }: SummaryCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  }).format(amount)

  const cardStyles = {
    income: {
      border: 'border-t-4 border-green-600',
      amount: 'text-green-700',
    },
    expense: {
      border: 'border-t-4 border-red-600',
      amount: 'text-red-600',
    },
    profit: {
      border: 'border-t-4 border-indigo-600',
      amount: 'text-indigo-600',
    },
  }

  return (
    <article
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${cardStyles[type].border}`}
    >
      <p className="mb-4 text-sm font-medium text-slate-500">{title}</p>

      <h3
        className={`text-2xl font-bold tracking-tight ${cardStyles[type].amount}`}
      >
        {formattedAmount}
      </h3>
    </article>
  )
}

export default SummaryCard