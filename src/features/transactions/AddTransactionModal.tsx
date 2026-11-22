
import { useState } from 'react'
import Modal from '../../components/Modal'
import type {
  BusinessName,
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../../types/transactions'

type AddTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: Transaction) => void
  editingTransaction?: Transaction | null
}

const businesses: BusinessName[] = [
  'SunBliz',
  'GiftSo',
  'BG Traders',
]

const categories: TransactionCategory[] = [
  'Sales',
  'Supplies',
  'Packaging',
  'Delivery',
  'Other',
]

const transactionTypes: TransactionType[] = [
  'income',
  'expense',
]

const fieldClassName =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer'

const labelClassName =
  'flex flex-col gap-2 text-sm font-semibold text-gray-700'

function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
}: AddTransactionModalProps) {

  const [business, setBusiness] = useState<BusinessName>(
    editingTransaction?.business ?? 'SunBliz',
  )

  const [type, setType] = useState<TransactionType>(
    editingTransaction?.type ?? 'income',
  )

  const [amount, setAmount] = useState(
    editingTransaction ? String(editingTransaction.amount) : '',
  )

  const [category, setCategory] = useState<TransactionCategory>(
    editingTransaction?.category ?? 'Sales',
  )

  const [date, setDate] = useState(
    editingTransaction?.date ?? new Date().toISOString().slice(0, 10),
  )

  const [description, setDescription] = useState(
    editingTransaction?.description ?? '',
  )

  function handleClose() {
    setBusiness('SunBliz')
    setType('income')
    setAmount('')
    setCategory('Sales')
    setDate(new Date().toISOString().slice(0, 10))
    setDescription('')

    onClose()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const transaction: Transaction = {
      id: editingTransaction?.id ?? crypto.randomUUID(),
      business,
      type,
      amount: Number(amount),
      category,
      date,
      description: description.trim(),
    }

    onSave(transaction)
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      description={
        editingTransaction
          ? 'Update your transaction details.'
          : 'Record income or an expense.'
      }
      onClose={handleClose}
    >
      <form
        className="mt-7 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <label className={labelClassName}>
          Business
          <select
            name="business"
            value={business}
            onChange={(event) =>
              setBusiness(event.target.value as BusinessName)
            }
            required
            className={fieldClassName}
          >
            {businesses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Transaction Type
          <select
            name="type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as TransactionType)
            }
            required
            className={fieldClassName}
          >
            {transactionTypes.map((item) => (
              <option key={item} value={item}>
                {item === 'income' ? 'Income' : 'Expense'}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Amount (LKR)
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="e.g. 2500.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            className={fieldClassName}
          />
        </label>

        <label className={labelClassName}>
          Category
          <select
            name="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as TransactionCategory)
            }
            required
            className={fieldClassName}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Date
          <input
            name="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className={fieldClassName}
          />
        </label>

        <label className={labelClassName}>
          Description (Optional)
          <textarea
            name="description"
            placeholder="Add a note about this transaction"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={`${fieldClassName} resize-y`}
          />
        </label>

        <div className="mt-1 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
          >
            {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTransactionModal
