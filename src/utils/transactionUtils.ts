import type { Transaction } from '../types/transactions'

export function getMonthlyTransactions(
  transactions: Transaction[],
  month: string,
): Transaction[] {
  return transactions.filter((transaction) =>
    transaction.date.startsWith(month),
  )
}

export function calculateIncome(
  transactions: Transaction[],
): number {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function calculateExpenses(
  transactions: Transaction[],
): number {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function calculateProfit(
  income: number,
  expenses: number,
): number {
  return income - expenses
}