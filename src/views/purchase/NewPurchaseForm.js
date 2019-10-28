import React, {Fragment, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {isEmpty, isNil, map, path, repeat, toUpper} from 'ramda'
import Button from '@material-ui/core/Button'
import {showError} from '../../components/messages/errors'
import {ActionsContainer, InlineFormContainer} from '../../components/layout'
import {currency} from '../../utils/formats'
import productService from '../../service/product'
import inventoryService from '../../service/inventory'
import purchaseService from '../../service/purchase'

const getValue = path(['target', 'value'])

const initialState = {
  quantity: '',
  reference: '',
  price: '',
  fabric: '',
  color: '',
}

const  NewPurchaseItemForm = ({customer, handlePurchaseLine}) => {
  if (isNil(customer) || isEmpty(customer)) return showError('Necesitas Agregar un Cliente!')
  const [purchase, setPurchase] = useState(initialState)

  const handleChange = field => evt => setPurchase({...purchase, [field]: getValue(evt)})

  const saveLine = async () => {
    const product = await productService.findOrCreate({name: purchase.reference})
    const schema = repeat({
      product,
      fabric: purchase.fabric,
      color: purchase.color,
      credit: true,
    }, purchase.quantity)

    const inventories = map(inventoryService.save, schema)
    const newInventories = await Promise.all(inventories)
    handlePurchaseLine({ items: newInventories, price: purchase.price })
  }

  return (
    <Fragment>
      <InlineFormContainer>
        <Field label='Cantidad' field='quantity' purchase={purchase} handleChange={handleChange} />
        <Field label='Referencia' field='reference' purchase={purchase} handleChange={handleChange} weight={3} />
        <Field label='Precio' field='price' purchase={purchase} handleChange={handleChange} format={currency} />
        <Field label='Tela' field='fabric' purchase={purchase} handleChange={handleChange} weight={2} />
        <Field label='Color' field='color' purchase={purchase} handleChange={handleChange} />
      </InlineFormContainer>
      <ActionsContainer>
        <Button onClick={() => setPurchase(initialState)} color="secondary">
          Cancelar
        </Button>
        <Button onClick={saveLine} color="primary">
          Agregar
        </Button>
      </ActionsContainer>
    </Fragment>
  )
}

const Field = ({ field, label, purchase, handleChange, weight = 1, format }) => (
  <div style={{flexGrow: weight, flexBasis: weight}}>
    <TextField
      value={format ? format(purchase[field]) : purchase[field]}
      margin="dense"
      id={"txt-" + field}
      label={toUpper(label)}
      type="text"
      fullWidth
      onChange={handleChange(field)}
    />
  </div>
)

export default NewPurchaseItemForm
