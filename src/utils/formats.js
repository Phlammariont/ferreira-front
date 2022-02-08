const cleanNumber = number => number.replace(/[^0-9]/g, '')

export const currency = (numberStr) => {
  if(!numberStr) return ''
  if(isNaN(numberStr)) return 0
  return Number(cleanNumber(numberStr)).toLocaleString('es-CO', {currency: 'COP' , style: 'currency'})
}