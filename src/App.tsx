
import { useState, useEffect } from 'react'
import AddTransactionModal from './features/transactions/AddTransactionModal'
import BusinessCard from './components/BusinessCard'
import SummaryCard from './components/SummaryCard'
import TransactionList from './components/TransactionList'
import MonthSelector from './components/MonthSelector'
import TransactionFilters from './components/TransactionFilters'
import TransactionSortMenu from './components/TransactionSortMenu'
import Toast, { type ToastType } from './components/Toast'
import type { Transaction, BusinessName, TransactionType, TransactionCategory, TransactionSortOption } from './types/transactions'
import {
  getMonthlyTransactions,
  calculateIncome,
  calculateExpenses,
  calculateProfit,
} from './utils/transactionUtils'
import { getPreviousMonth, getNextMonth } from './utils/dateUtils'
import './App.css'

function App() {

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem('biztrack-transactions')

      return savedTransactions ? JSON.parse(savedTransactions) as Transaction[] : []
    } catch {
      return []
    }
  })

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const [selectedBusiness, setSelectedBusiness] = useState<BusinessName | 'All Businesses'>('All Businesses')

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedType, setSelectedType] = useState<TransactionType | 'all'>('all')

  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | 'all'>('all')

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().toISOString().slice(0, 7)
  })

  const [selectedSort, setSelectedSort] = useState<TransactionSortOption>('newest')

  const [toast, setToast] = useState<{
    message: string
    type: ToastType
  } | null>(null)

  const currentMonth = selectedMonth

  const handlePreviousMonth = () => {
    setSelectedMonth((previousMonth) =>
      getPreviousMonth(previousMonth),
    )
  }

  const handleNextMonth = () => {
    setSelectedMonth((previousMonth) =>
      getNextMonth(previousMonth),
    )
  }

  const businessTransactions =
    selectedBusiness === 'All Businesses'
      ? transactions
      : transactions.filter(
          (transaction) => transaction.business === selectedBusiness,
        )

  const monthlyTransactions = getMonthlyTransactions(
    businessTransactions,
    currentMonth,
  )

  const filteredTransactions = monthlyTransactions.filter(
    (transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesType =
        selectedType === 'all' ||
        transaction.type === selectedType

      const matchesCategory =
        selectedCategory === 'all' ||
        transaction.category === selectedCategory

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      )
    },
  )

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => {
      switch (selectedSort) {
        case 'newest':
          return (
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
          )

        case 'oldest':
          return (
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
          )

        case 'highest':
          return b.amount - a.amount

        case 'lowest':
          return a.amount - b.amount

        default:
          return 0
      }
    },
  )


  const monthlyIncome = calculateIncome(filteredTransactions)

  const monthlyExpenses = calculateExpenses(filteredTransactions)

  const monthlyProfit = calculateProfit(
    monthlyIncome,
    monthlyExpenses,
  )

  useEffect(() => {
    localStorage.setItem(
      'biztrack-transactions',
      JSON.stringify(transactions),
    )
  }, [transactions])

  function handleSaveTransaction(transaction: Transaction) {
    if (editingTransaction) {
      setTransactions((currentTransactions) =>
        currentTransactions.map((item) =>
          item.id === transaction.id ? transaction : item,
        ),
      )

      setToast({
        message: 'Transaction updated successfully!',
        type: 'success',
      })
    } else {
      setTransactions((currentTransactions) => [
        ...currentTransactions,
        transaction,
      ])

      setToast({
        message: 'Transaction added successfully!',
        type: 'success',
      })
    }

    setIsTransactionModalOpen(false)
    setEditingTransaction(null)
  }

  function handleDeleteTransaction(id: string) {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== id,
      ),
    )

    setToast({
      message: 'Transaction deleted successfully!',
      type: 'success',
    })
  }

  function handleEditTransaction(transaction: Transaction) {
    setEditingTransaction(transaction)
    setIsTransactionModalOpen(true)
  }

  function handleClearFilters() {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedCategory('all')
  }

  function handleCloseToast() {
    setToast(null)
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1200px] px-5 py-7 md:px-8 md:py-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      <header className="mb-11 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-indigo-600">
            BizTrack
          </h1>

          <p className="mt-2 text-[15px] text-slate-500">
            Business Finance Dashboard
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {selectedBusiness !== 'All Businesses' && (
            <button
              type="button"
              onClick={() => setSelectedBusiness('All Businesses')}
              className="whitespace-nowrap rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-[13px] font-semibold text-indigo-700 transition hover:bg-indigo-100 cursor-pointer"
            >
              ← All Businesses
            </button>
          )}

          <button
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
            onClick={() => setIsTransactionModalOpen(true)}
          >
            + Add Transaction
          </button>
        </div>
      </header>

      <main>
        <section className="mb-9 md:mb-11">
          <h2 className="text-[22px] font-bold tracking-tight text-gray-800">
            {selectedBusiness === 'All Businesses'
              ? 'Monthly Overview'
              : `Monthly ${selectedBusiness} Overview`}
          </h2>
          <p className="mb-6 mt-2 text-sm leading-relaxed text-slate-500">
            Your business performance at a glance.
          </p>

          <MonthSelector
            selectedMonth={selectedMonth}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <SummaryCard
              title="Monthly Income"
              amount={monthlyIncome}
              type="income"
            />

            <SummaryCard
              title="Monthly Expenses"
              amount={monthlyExpenses}
              type="expense"
            />

            <SummaryCard
              title="Net Profit / Loss"
              amount={monthlyProfit}
              type="profit"
            />
          </div>
        </section>

        <section className="mb-9 md:mb-11">
          <h2 className="text-[22px] font-bold tracking-tight text-gray-800">
            Your Businesses
          </h2>
          <p className="mb-6 mt-2 text-sm leading-relaxed text-slate-500">
            Select a business to view its finances.
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <BusinessCard
              name="SunBliz"
              description="Dessert Business"
              onClick={() => setSelectedBusiness('SunBliz')}
              isSelected={selectedBusiness === 'SunBliz'}
            />

            <BusinessCard
              name="GiftSo"
              description="Gifting & Korean Products"
              onClick={() => setSelectedBusiness('GiftSo')}
              isSelected={selectedBusiness === 'GiftSo'}
            />

            <BusinessCard
              name="BG Traders"
              description="Retail Business"
              onClick={() => setSelectedBusiness('BG Traders')}
              isSelected={selectedBusiness === 'BG Traders'}
            />
          </div>
        </section>

        <section className="mb-9 md:mb-11">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[22px] font-bold tracking-tight text-gray-800">
              Recent Transactions
            </h2>

            <TransactionSortMenu
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
            />
          </div>

          <p className="mb-6 mt-2 text-sm leading-relaxed text-slate-500">
            Your latest business transactions.
          </p>

          <TransactionFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onClear={handleClearFilters}
          />

          <TransactionList transactions={sortedTransactions} onDelete={handleDeleteTransaction} onEdit={handleEditTransaction}/>
        </section>
      
      </main>

      <AddTransactionModal
        key={editingTransaction?.id ?? 'new-transaction'}
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false)
          setEditingTransaction(null)
        }}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  )
}


export default App
