import React, {Fragment, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {isEmpty, isNil, path, toUpper} from 'ramda'
import Button from '@material-ui/core/Button'
import {showError} from '../../components/messages/errors'
import {ActionsContainer, InlineFormContainer} from '../../components/layout'

const getValue = path(['target', 'value'])

const initialState = {
  quantity: '',
  reference: '',
  price: '',
  fabric: '',
  color: '',
}

const  NewPurchaseForm = ({customer}) => {

  const [purchase, setPurchase] = useState(initialState)

  const handleChange = field => evt => setPurchase({...purchase, [field]: getValue(evt)})

  const saveLine = () => console.log(purchase)

  if (isNil(customer) || isEmpty(customer)) return showError('Necesitas Agregar un Cliente!')

  return (
    <Fragment>
      <InlineFormContainer>
        <Field label='Cantidad' field='quantity' purchase={purchase} handleChange={handleChange} weight={1}/>
        <Field label='Referencia' field='reference' purchase={purchase} handleChange={handleChange} weight={3}/>
        <Field label='Precio' field='price' purchase={purchase} handleChange={handleChange} weight={1}/>
        <Field label='Tela' field='fabric' purchase={purchase} handleChange={handleChange} weight={2}/>
        <Field label='Color' field='color' purchase={purchase} handleChange={handleChange} weight={1}/>
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

const Field = ({field, label, purchase, handleChange, weight}) => <div style={{flexGrow: weight, flexBasis: weight}}>
  <TextField
    value={purchase[field]}
    margin="dense"
    id={"txt-" + field}
    label={toUpper(label)}
    type="text"
    fullWidth
    onChange={handleChange(field)}
  />
</div>

export default NewPurchaseForm