import React, {Fragment, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {isEmpty, isNil, map, path, toUpper} from 'ramda'
import Button from '@material-ui/core/Button'
import {showError} from '../../components/messages/errors'
import {ActionButton, ActionsContainer, InlineFormContainer} from '../../components/layout'
import {currency} from '../../utils/formats'
import productService from '../../service/product'

const getValue = path(['target', 'value'])

const initialPurchaseItem = {
  color: '',
  fabric: '',
  price: '',
  quantity: '',
  reference: '',
}

const  NewPurchaseItemForm = ({ handlePurchaseLine }) => {
  const [purchaseItem, setPurchaseItem] = useState(initialPurchaseItem)
  const { quantity, reference, price, fabric, color } = purchaseItem
  const handleChange = field => evt => setPurchaseItem({...purchaseItem, [field]: getValue(evt)})

  const saveLine = async () => {
    const product = await productService.findOrCreate({name: purchaseItem.reference})
    return handlePurchaseLine({ product, ...purchaseItem})
  }

  return (
    <Fragment>
      <InlineFormContainer>
        <Field label='Cantidad' field='quantity' value={quantity} handleChange={handleChange} />
        <Field label='Referencia' field='reference' value={reference} handleChange={handleChange} weight={3} />
        <CurrencyField label='Precio' field='price' value={price} handleChange={handleChange} />
        <Field label='Tela' field='fabric' value={fabric} handleChange={handleChange} weight={2} />
        <Field label='Color' field='color' value={color} handleChange={handleChange} />
      </InlineFormContainer>
      <ActionsContainer>
        <Button onClick={() => handlePurchaseLine()} color="secondary">
          Cancelar
        </Button>
        <Button onClick={saveLine} color="primary">
          Agregar
        </Button>
      </ActionsContainer>
    </Fragment>
  )
}

const Field = ({ field, label, value, handleChange, weight = 1, onFocus, onBlur, autoFocus }) => (
  <div style={{flexGrow: weight, flexBasis: weight}}>
    <TextField
      value={value}
      margin="dense"
      id={"txt-" + field}
      label={toUpper(label)}
      type="text"
      fullWidth
      onChange={handleChange(field)}
      onFocus={onFocus}
      autoFocus={autoFocus}
      onBlur={onBlur}
    />
  </div>
)

const CurrencyField = ({ value, ...props }) => {
  const [focus, setFocus] = useState(false)
  if (focus) return <Field value={value} {...props} autoFocus={true} onBlur={() => setFocus(false)}/>
  return <Field value={currency(value)} {...props} onFocus={() => setFocus(true)}/>
}

const PurchaseItemsTable = ({ purchase }) => {
  if ( isEmpty(purchase.items) ) return null
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Referencia</th>
            <th>Precio</th>
            <th>Tela</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          { map(PurchaseItem, purchase.items) }
        </tbody>
      </table>
    </div>
  )
}

const PurchaseItem = ({ quantity, reference, price, fabric, color }) => {
  return (
    <tr key={`${ quantity + reference + price + fabric + color }`}>
      <td>{quantity}</td>
      <td>{reference}</td>
      <td>{price}</td>
      <td>{fabric}</td>
      <td>{color}</td>
    </tr>
  )
}

const NewPurchaseForm = ({ customer, handleSubmit, purchase: editPurchase = { items: [], price: 0 } }) => {
  if (isNil(customer) || isEmpty(customer)) return showError('Necesitas Agregar un Cliente!')
  const [purchase, setPurchase] = useState(editPurchase)
  const [isAdding, setIsAdding] = useState(true)

  const handlePurchaseLine = line => {
    if (isNil(line)) return setIsAdding(false)
    setPurchase({
      ...purchase,
      items: [...purchase.items, line],
      price: purchase.price + Number(line.price),
    })
    return setIsAdding(false)
  }
  return (
    <>
      <PurchaseItemsTable purchase={purchase}/>
      { isAdding && <NewPurchaseItemForm handlePurchaseLine={handlePurchaseLine} />}
      {
        !isAdding &&
        <ActionsContainer>
          <ActionButton color="primary" onClick={() => setIsAdding(true)}>Agregar Productos</ActionButton>
          { !!purchase.items.length && <ActionButton color="primary" onClick={() => handleSubmit(purchase)}>Continuar Al Crédito</ActionButton> }
        </ActionsContainer>
      }
    </>
  )
}

export default NewPurchaseForm
