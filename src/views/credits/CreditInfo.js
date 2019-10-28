import React from 'react'
import { isEmpty, map } from 'ramda'

const CreditInfo = ({customer = {}, guarantor = {}, purchaseItems = []}) => (
  <div>
    {!isEmpty(customer) && <div>Cliente: {customer.name} - C.C.: {customer.legalId}</div>}
    {!isEmpty(guarantor) && <div>Codeudor: {guarantor.name} - C.C.: {guarantor.legalId}</div>}
    {!isEmpty(purchaseItems) && map(
      ({items, price}) => <div key={items[0].product.name + price}>Reference: {items[0].product.name} - Price: {price}</div>,
      purchaseItems
    )}

  </div>
)

export default CreditInfo