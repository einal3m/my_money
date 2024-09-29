const today = new Date()

const zeroPad = (num: number) => String(num).padStart(2, '0')
const toDateString = (date: Date): string => {
  return `${date.getFullYear()}-${zeroPad(date.getMonth())}-${zeroPad(date.getDate())}`
}

export const todaysDate = toDateString(today)
