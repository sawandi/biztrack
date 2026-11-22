
export type TransactionType = 'income' | 'expense'

export type BusinessName = 'SunBliz' | 'GiftSo' | 'BG Traders'

export type TransactionCategory =
  | 'Sales'
  | 'Supplies'
  | 'Packaging'
  | 'Delivery'
  | 'Other'

export type Transaction = {
  id: string
  business: BusinessName
  type: TransactionType
  amount: number
  category: TransactionCategory
  date: string
  description: string
}

export type TransactionSortOption =
  | 'newest'
  | 'oldest'
  | 'highest'
  | 'lowest'
