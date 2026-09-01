import dayjs from 'dayjs'

export const getSimpleMonth = (date: string) => {
  const convertedDate = dayjs(date)

  const locale = navigator.language
  return convertedDate.locale(locale).format('MMM')
}

export const getDay = (date: string) => {
  const convertedDate = dayjs(date)

  const locale = navigator.language
  return convertedDate.locale(locale).format('DD')
}

export const getYear = (date: string) => {
  const convertedDate = dayjs(date)

  const locale = navigator.language
  return convertedDate.locale(locale).format('YYYY')
}

export const getTime = (date: string) => {
  const convertedDate = dayjs(date)

  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(convertedDate.toDate())
}
