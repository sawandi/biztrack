import { useState } from 'react'
import type { Transaction } from '../types/transactions'
import Modal from './Modal'

type TransactionListProps = {
  transactions: Transaction[]
  onDelete: (id: string) => void
  onEdit: (transaction: Transaction) => void
}

function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: TransactionListProps) {
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          No transactions yet.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b border-gray-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Business
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Description
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm text-slate-600">
                  {transaction.date}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                  {transaction.business}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      transaction.type === 'income'
                        ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'
                        : 'rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700'
                    }
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {transaction.category}
                </td>

                <td className="max-w-[250px] px-5 py-4 text-sm text-slate-600">
                  {transaction.description || '—'}
                </td>

                <td
                  className={
                    transaction.type === 'income'
                      ? 'px-5 py-4 text-right text-sm font-semibold text-green-700'
                      : 'px-5 py-4 text-right text-sm font-semibold text-red-600'
                  }
                >
                  {new Intl.NumberFormat('en-LK', {
                    style: 'currency',
                    currency: 'LKR',
                    minimumFractionDigits: 2,
                  }).format(transaction.amount)}
                </td>

                <td className="px-5 py-4 text-right">
                    <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold bg-green-300 text-green-600 transition hover:bg-green-50 cursor-pointer"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setTransactionToDelete(transaction.id)}
                        className="rounded-lg px-3 py-2 ml-2 text-sm font-semibold bg-red-300 text-red-600 transition hover:bg-red-50 cursor-pointer"
                    >
                        Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={transactionToDelete !== null}
        title="Delete Transaction?"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
        onClose={() => setTransactionToDelete(null)}
      >
        <div className="mt-7 flex justify-end gap-3">
            <button
                type="button"
                onClick={() => setTransactionToDelete(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            >
                Cancel
            </button>

            <button
                type="button"
                onClick={() => {
                    if (transactionToDelete) {
                      onDelete(transactionToDelete)
                      setTransactionToDelete(null)
                    }
                }}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 cursor-pointer"
            >
                Delete
            </button>
        </div>
      </Modal>
    </div>
  )
}

export default TransactionList