import React from 'react'
import { isEmpty, map } from 'ramda'

const CreditInfo = ({customer = {}, guarantor = {}, purchase = {}}) => (
  <div>
    {!isEmpty(customer) && <div>Cliente: {customer.name} - C.C.: {customer.legalId}</div>}
    {!isEmpty(guarantor) && <div>Codeudor: {guarantor.name} - C.C.: {guarantor.legalId}</div>}
    {!isEmpty(purchase) && map(
      ({reference, price, quantity}) => <div key={reference + price}>Referencia: {reference}. {quantity} x {price} = { price * quantity }</div>,
      purchase.items
    )}
    {!isEmpty(purchase) && <div><span>Precio total: </span><span>{purchase.price}</span></div>}

  </div>
)

export default CreditInfo