import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import { map, path } from 'ramda'
import { ModelFormControls } from '../../components/crud/model-form'
import PaymentFee from '../../model/paymentFee'
import { ActionsContainer, InlineFormContainer } from '../../components/layout'
import Button from '@material-ui/core/Button'

const getValue = path(['target', 'value'])

class NewCreditInfoForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creditInfo: {
        financedValue: props.purchase.price,
        numberOfFees: 12,
      },
      downPayment: {
        value: props.purchase.price * 0.3
      }
    }
  }

  handleChange = field => evt => this.setState({creditInfo: {...this.state.creditInfo, [field]: getValue(evt)} })

  renderField ({field, label, value}) {
    return <TextField
      margin="dense"
      id={"txt-" + field}
      label={label}
      type="text"
      value={value}
      fullWidth
      onChange={this.handleChange(field)}
    />
  }

  setDownPayment = (payment) => {
    console.log(payment)
    this.setState({...this.state, downPayment: payment})
  }

  renderFeeField = () => {
    return (
      <ModelFormControls
        model={PaymentFee}
        handleChange={this.setDownPayment}
        currentValue={this.state.downPayment}
      />
    )
  }

  renderFeeFields = () => {
    if ( !this.state.creditInfo.numberOfFees || isNaN(this.state.creditInfo.numberOfFees)) return null
    const numberOfFees = Number(this.state.creditInfo.numberOfFees) - 1
    if ( numberOfFees <= 0 ) return null
    const payments = Array( numberOfFees )
      .fill({ value: Math.round(( this.state.creditInfo.financedValue - this.state.downPayment.value ) / numberOfFees ) })
    return (
      <div>
        <h3>Cuotas Restantes</h3>
        {map((fee) => (
          <InlineFormContainer>
            <ModelFormControls model={PaymentFee} handleChange={this.setDownPayment} currentValue={fee} />
          </InlineFormContainer>
        ), payments)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <InlineFormContainer>
          {this.renderField ({
            field:'financedValue',
            label:'Valor a financiar',
            value: this.state.creditInfo.financedValue
          })}
          {this.renderField ({field:'numberOfFees', label:'Número de cuotas', value: this.state.creditInfo.numberOfFees})}
        </InlineFormContainer>
        <div>
          <h3>Cuota Inicial</h3>
          <InlineFormContainer>
            {this.renderFeeField()}
          </InlineFormContainer>
        </div>
        {this.renderFeeFields ()}
        <ActionsContainer>
          <Button onClick={() => this.props.handleSubmit(this.state)} color="primary">
           Finalizar
          </Button>
        </ActionsContainer>
      </div>
    )
  }
}

export default NewCreditInfoForm