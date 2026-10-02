export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
}

export const formatAmount = (value: string): string => {
  if (!value) return ''

  const [int = '', dec] = value.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${grouped}${dec !== undefined ? `.${dec}` : ''}`
}
