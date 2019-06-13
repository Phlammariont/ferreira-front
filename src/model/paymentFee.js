import Model from '../components/crud/model'

class PaymentFee extends Model {
  name = 'paymentfee'
  label = 'Cuota'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'value', label: 'Valor' },
    { name: 'dueDate', label: 'Fecha de Pago' },
    { name: 'receiptNumber', label: 'Recibo No.' },
    { name: 'paidValue', label: 'Valor Pagado' },
    { name: 'currentDate', label: 'Fecha' },
    { name: 'observations', label: 'Observaciones' },
  ]
}

export default PaymentFee