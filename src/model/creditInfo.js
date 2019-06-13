import Model from '../components/crud/model'
import Customer from './customer'
import PaymentFee from './paymentFee'
import Purchase from './purchase'

class CreditInfo extends Model {
  name = 'credit'
  Label = 'Cartera'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'customer', label: 'Cliente', instanceOf: Customer },
    { name: 'purchase', label: 'Negocio', instanceOf: Purchase },
    { name: 'financedValue', label: 'Valor a financiar' },
    { name: 'initialFee', label: 'Cuota Inicial', instanceOf: PaymentFee },
    { name: 'paymentFees', label: 'Cuotas', instanceOf: [PaymentFee] },
    { name: 'balance', label: 'Saldo' },
  ]
}

export default CreditInfo