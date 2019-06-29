import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {path} from 'ramda'

const getValue = path(['target', 'value'])

const  NewPurchaseForm = () => {
  const [purchase, setPurchase] = useState({})

  const handleChange = field => evt => setPurchase({[field]: getValue(evt)})

  const Field = ({field}) => <TextField
    value={purchase[field]}
    margin="dense"
    id={"txt-" + field}
    label={field}
    type="text"
    fullWidth
    onChange={handleChange(field)}
  />

  return (
    <div>
      <Field field='quantity' />
      <Field field='reference' />
      <Field field='price' />
      <Field field='fabric' />
      <Field field='color' />
    </div>
  )
}

export default NewPurchaseForm