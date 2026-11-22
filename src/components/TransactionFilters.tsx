import type {
  TransactionType,
  TransactionCategory,
} from '../types/transactions'

type TransactionFiltersProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedType: TransactionType | 'all'
  onTypeChange: (value: TransactionType | 'all') => void
  selectedCategory: TransactionCategory | 'all'
  onCategoryChange: (
    value: TransactionCategory | 'all',
  ) => void
  onClear: () => void,
}

function TransactionFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  onClear,
}: TransactionFiltersProps) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                Search transactions
                </label>

                <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                    onSearchChange(event.target.value)
                }
                placeholder="Search by description..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            {/* Transaction Type */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                Transaction Type
                </label>

                <select
                value={selectedType}
                onChange={(event) =>
                    onTypeChange(
                    event.target.value as TransactionType | 'all',
                    )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
                </select>
            </div>

            {/* Category */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
                </label>

                <select
                value={selectedCategory}
                onChange={(event) =>
                    onCategoryChange(
                    event.target.value as TransactionCategory | 'all',
                    )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                >
                <option value="all">All Categories</option>
                <option value="Sales">Sales</option>
                <option value="Supplies">Supplies</option>
                <option value="Packaging">Packaging</option>
                <option value="Delivery">Delivery</option>
                <option value="Other">Other</option>
                </select>
            </div>
        </div>
        <div className="mt-4 flex justify-end">
            <button
                type="button"
                onClick={onClear}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
            >
                Clear Filters
            </button>
        </div>
    </div>
  )
}

export default TransactionFilters
