
export const getPreviousMonth = (month: string): string => {
  const date = new Date(`${month}-01T12:00:00`)
  date.setMonth(date.getMonth() - 1)

  return date.toISOString().slice(0, 7)
}

export const getNextMonth = (month: string): string => {
  const date = new Date(`${month}-01T12:00:00`)
  date.setMonth(date.getMonth() + 1)

  return date.toISOString().slice(0, 7)
}
