import React from 'react'
import {isEmpty} from 'ramda'

const CreditInfo = ({customer = {}, guarantor = {}}) => (
  <div>
    {!isEmpty(customer) && <div>Cliente: {customer.name} - C.C.: {customer.legalId}</div>}
    {!isEmpty(guarantor) && <div>Codeudor: {guarantor.name} - C.C.: {guarantor.legalId}</div>}
  </div>
)

export default CreditInfo