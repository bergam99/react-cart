// formatting price
const CURRENCY_FORMATTET = new Intl.NumberFormat(undefined, {
    currency:"EUR",
    style:"currency",
})

const formatCurrency = (number:number) => {
  return ( CURRENCY_FORMATTET.format(number) )
}

export default formatCurrency