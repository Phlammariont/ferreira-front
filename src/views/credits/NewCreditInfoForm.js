import React, {useState, Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {path} from 'ramda'
import ModelForm from '../../components/crud/model-form'
import PaymentFee from '../../model/paymentFee'

const getValue = path(['target', 'value'])

class NewCreditInfoForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creditInfo: {}
    }
  }

  handleChange = field => evt => this.setState({creditInfo: {...this.state.creditInfo, [field]: getValue(evt)} })

  renderField ({field, label}) {
    return <TextField
      value={this.state.creditInfo[field]}
      margin="dense"
      id={"txt-" + field}
      label={label}
      type="text"
      fullWidth
      onChange={this.handleChange(field)}
    />
  }

  renderFeeField = () => (
    <ModelForm model={PaymentFee} onSave={()=>{}}/>//TODO @Leon
  )

  renderFeeFields = () => (
    <div> hola ,mundo</div>
  )

  render() {
    return (
      <div>
        {this.renderField ( {field:'financedValue', label:'Valor a financiar'})}
        {this.renderFeeField({ field:'initialFee', label:'Cuota Inicial' })}
        {this.renderFeeFields ({field:'paymentFees', label:'Cuotas'})}
      </div>
    )
  }
}

export default NewCreditInfoForm