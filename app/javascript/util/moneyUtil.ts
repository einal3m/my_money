import accounting from 'accounting'

export const centsToDollars = (cents: number): number => {
  return cents / 100
}

export const dollarsToCents = (dollars: number): number => {
  return Math.round(dollars * 100)
}

export const moneyFormat = (dollars: number): string => {
  return accounting.formatMoney(dollars, {
    precision: 2,
    format: { pos: '%s %v', neg: '%s (%v)', zero: '%s  --' },
  })
}

export const numberFormat = (dollars: number): string => {
  return accounting.formatNumber(Math.abs(dollars), 2, ',')
}

export const numberFormatWithSign = (dollars: number): string => {
  return accounting.formatMoney(dollars, {
    precision: 2,
    format: { pos: '%v', neg: '-%v', zero: '0.00' },
  })
}
