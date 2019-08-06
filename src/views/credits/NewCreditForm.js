import React, {Component, Fragment} from 'react'
import NewCustomerForm from '../customer/NewCustomerForm'
import NewPurchaseForm from '../purchase/NewPurchaseForm'
import NewCreditInfoForm from './NewCreditInfoForm'
import Stepper from '../../components/stepper'
import Workspace from '../../components/workspace'
import Viewer from '../../components/viewer'
import { map, propEq  } from 'ramda'
import CreditInfo from './CreditInfo'
import {ActionButton, ActionsContainer} from '../../components/layout'

const isGuarantorStep = propEq('activeStep', 1)
const isPurchaseStep = propEq('activeStep', 2)
const isCreditStep = propEq('activeStep', 3)

const completeStep = (steps, step) => map(
  currentStep => propEq('title', step, currentStep) ? {...currentStep, complete: true} : currentStep,
  steps,
)

class NewCreditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      steps: [
        { title: 'Datos del Cliente', complete: false },
        { title: 'Datos del Codeudor', complete: false },
        { title: 'Datos del Negocio', complete: false },
        { title: 'Datos del Credito', complete: false },
      ],
      credit: {},
    }
  }

  handleStep = step => {
    this.setState({activeStep: step})
  }

  displayClientForm = () => this.setState({ displayClientForm: true })
  hideCustomerForm = () => this.setState({ displayClientForm: false })

  handleCustomer = (customer) => {
    this.setState({
      credit:{...this.state.credit, customer},
      steps: completeStep(this.state.steps, 'Datos del Cliente'),
      activeStep: 1,
    })
  }

  handleGuarantor = (guarantor) => {
    this.setState({
      credit:{...this.state.credit, guarantor},
      steps: completeStep(this.state.steps, 'Datos del Codeudor'),
      activeStep: 2,
    })
  }

  renderCustomerForm = () => {
    if (this.state.activeStep !== 0) return null
    if (this.state.displayClientForm)
      return <NewCustomerForm onChange={this.handleCustomer} onClose={this.hideCustomerForm}/>
    return (
      <Fragment>
        <h2>Agrega un Cliente al Credito</h2>
        <ActionsContainer>
          <ActionButton color="primary">Buscar Cliente</ActionButton>
          <ActionButton color="primary" onClick={this.displayClientForm}>Nuevo Cliente</ActionButton>
        </ActionsContainer>
      </Fragment>
    )
  }

  displayGuarantorForm = () => this.setState({ displayGuarantorForm: true })
  hideGuarantorForm = () => this.setState({ displayGuarantorForm: false })

  renderGuarantorForm = () => {
    if( !isGuarantorStep(this.state) ) return null
    if (this.state.displayGuarantorForm)
      return <NewCustomerForm isGuarantor={true} onClose={this.hideGuarantorForm} onChange={this.handleGuarantor}/>
    return (
      <Fragment>
        <h2>Agrega un Cliente al Credito</h2>
        <ActionsContainer>
          <ActionButton color="primary">Buscar Codeudor</ActionButton>
          <ActionButton color="primary" onClick={this.displayGuarantorForm}>Nuevo Codeudor</ActionButton>
        </ActionsContainer>
      </Fragment>
    )
  }

  renderPurchaseForm = () => {
    if (!isPurchaseStep(this.state)) return null
    return  <NewPurchaseForm customer={this.state.credit.customer}/>
  }
  renderCreditInfoForm = () => {
    if (!isCreditStep(this.state)) return null
    return <NewCreditInfoForm/>
  }

  render() {
    return (
      <main>
        <h1>Nuevo Crédito</h1>
        <div>
          <Stepper steps={this.state.steps} activeStep={this.state.activeStep} handleStep={this.handleStep}/>
          <Workspace>
            {this.renderCustomerForm()}
            {this.renderGuarantorForm()}
            {this.renderPurchaseForm()}
            {this.renderCreditInfoForm()}
          </Workspace>
          <Viewer>
            <CreditInfo {...this.state.credit}/>
          </Viewer>
        </div>
      </main>
    )
  }
}


export default NewCreditForm