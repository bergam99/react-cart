// formatting price
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency:"EUR",
    style:"currency",
})

const formatCurrency = (number:number) => {
  return ( CURRENCY_FORMATTER.format(number) )
}

export default formatCurrency

// 이 Intl.NumberFormat 생성자의 첫 번째 인자는 숫자를 형식화하는 데 사용되는 로케일을 지정합니다. 인자가 제공되지 않거나 undefined로 설정된 경우 사용자의 브라우저 또는 시스템의 기본 로케일이 사용됩니다.

// 기본 로케일은 사용자가 브라우저나 시스템에서 구성한 언어 및 지역 설정입니다. 예를 들어, 미국에 있는 사용자의 시스템 언어 및 지역 설정이 "영어 (미국)"으로 설정되어 있다면, 기본 로케일은 "en-US"가 됩니다.

// 기본 로케일을 사용하면 형식화된 숫자가 사용자의 선호하는 언어 및 지역별 형식화 규칙에 따라 표시되며, 다른 로케일 간에 코드 이식성이 향상됩니다.
// currency property is set to "EUR", which specifies the currency code for the currency that should be used for formatting the number.
// style property is set to "currency", which specifies the style of the formatted number as a currency value.