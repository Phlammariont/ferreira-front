import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NewCustomerForm from '../customer/NewCustomerForm'
import NewPurchaseForm from '../purchase/NewPurchaseForm'
import NewCreditInfoForm from './NewCreditInfoForm'


class NewCreditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayClientForm: false
    }
  }

  displayClientForm = () => {
    this.setState({ displayClientForm: true })
  }

  displayPurchaseForm = () => {
    this.setState({ displayPurchaseForm: true })
  }

  displayCreditForm = () => {
    this.setState({ displayCreditForm: true })
  }

  renderCustomerForm = () => {
    if (this.state.displayClientForm)
      return (
        <div>
          <NewCustomerForm />
        </div>
      )
    return null
  }

  displayGuarantorForm = () => {
    this.setState({ displayGuarantorForm: true })
  }

  renderGuarantorForm = () => {
    if (this.state.displayGuarantorForm)
      return (
        <div>
          <NewCustomerForm isGuarantor={true} />
        </div>
      )
    return null
  }

  renderPurchaseForm = () => this.state.displayPurchaseForm && <NewPurchaseForm />
  renderCreditForm = () => this.state.displayCreditForm && <NewCreditInfoForm />

  render() {
    return (
      <main>
        <h1>Nuevo Crédito</h1>
        <div>
          <Button variant="contained" >Buscar Cliente</Button>
          <Button variant="contained" onClick={this.displayClientForm}>Nuevo Cliente</Button>
          {this.renderCustomerForm()}
          <Button variant="contained" >Buscar Codeudor</Button>
          <Button variant="contained" onClick={this.displayGuarantorForm}>Nuevo Codeudor</Button>
          {this.renderGuarantorForm()}
          <Button variant="contained" onClick={this.displayPurchaseForm}>Nuevo Negócio</Button>
          {this.renderPurchaseForm()}
          <Button variant="contained" onClick={this.displayCreditForm}>Nuevo Crédito</Button>
          {this.renderCreditForm()}
        </div>
      </main>
    )
  }
}


export default NewCreditForm