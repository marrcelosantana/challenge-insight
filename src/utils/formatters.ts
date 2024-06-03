export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
})

export const formatPhone = (phone: string) => {
  return phone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
