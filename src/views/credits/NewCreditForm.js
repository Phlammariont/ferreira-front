import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import NewCustomerForm from '../customer/NewCustomerForm'
import NewPurchaseForm from '../purchase/NewPurchaseForm'
import NewCreditInfoForm from './NewCreditInfoForm'
import Stepper from '../../components/stepper'
import Workspace from '../../components/workspace'
import Viewer from '../../components/viewer'
import { either, includes, isEmpty, isNil, map, prop, propEq } from 'ramda'
import CreditInfo from './CreditInfo'
import {ActionButton, ActionsContainer} from '../../components/layout'
import {getCustomerCollection} from '../../selectors/customer'
import {connect} from 'react-redux'
import {fetchCustomers} from '../../redux/actions/creators/customer'
import SelectCustomerDialog from '../customer/SelectCustomerDialog'
import purchaseService from '../../service/purchase'
import {isValidPurchase} from '../../model/purchase'
import { getPurchaseCollection } from '../../selectors/purchase'
import { fetchPurchase } from '../../redux/actions/creators/purchase'

const isNilOrEmpty = either(isNil, isEmpty)
const shouldShowCreditInfo = isNilOrEmpty
const missingCustomer = isNilOrEmpty
const missingPurchase = isNilOrEmpty

const isGuarantorStep = propEq('activeStep', 1)
const isPurchaseStep = propEq('activeStep', 2)
const isCreditStep = propEq('activeStep', 3)

const completeStep = (steps, stepTitles) => map(
  currentStep => propEq('title', stepTitles, currentStep) ? {...currentStep, complete: true} : currentStep,
  steps,
)

const completeSteps = (steps, completedStepsTitles) => map(
  currentStep => includes(prop('title', currentStep), completedStepsTitles) ? {...currentStep, complete: true} : currentStep,
  steps,
)

const Main = styled.main`
  display: flex
`

class NewCreditForm extends Component {
  constructor(props) {
    super(props)
    const { customer, guarantor, purchase } = props
    this.state = {
      activeStep: 0,
      steps: [
        { title: 'Datos del Cliente', complete: false },
        { title: 'Datos del Codeudor', complete: false },
        { title: 'Datos del Negocio', complete: false },
        { title: 'Datos del Credito', complete: false },
      ],
      credit: {
        customer,
        guarantor,
        purchase
      },
    }
  }

  componentDidMount () {
    this.props.fetchCustomers()
    this.props.fetchPurchase()
  }

  // Temporal para prueba
  componentDidUpdate(prevProps) {
    if (prevProps.customer !== this.props.customer && prevProps.guarantor !== this.props.guarantor) {
      this.setState({
        ...this.state,
        credit: {
          ...this.state.credit,
          customer: this.props.customer,
          guarantor: this.props.guarantor,
          purchase: this.props.purchase,
        },
        steps: completeSteps(this.state.steps, ['Datos del Cliente', 'Datos del Codeudor']),
        activeStep: 2,
      })
    }

    if (prevProps.purchase !== this.props.purchase) {
      this.setState({
        ...this.state,
        credit: {
          ...this.state.credit,
          purchase: this.props.purchase,
        },
        steps: completeStep(this.state.steps, 'Datos del Negocio'),
        activeStep: 3,
      })
    }
  }

  handleStep = step => {
    this.setState({activeStep: step})
  }

  displayClientForm = () => this.setState({ displayClientForm: true })
  hideCustomerForm = () => this.setState({ displayClientForm: false })

  handleCustomer = customer => {
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

  handlePurchase = purchase => {
    if (!isValidPurchase(purchase)) return false
    purchaseService.save(purchase)
    this.setState({
      credit:{...this.state.credit, purchase},
      steps: completeStep(this.state.steps, 'Datos del Negocio'),
      activeStep: 3,
    })
  }

  handleLoan = loan => {
    if (!isValidPurchase(loan)) return false
    purchaseService.save(loan)
    this.setState({
      credit:{...this.state.credit, loan},
      steps: completeStep(this.state.steps, 'Datos del Negocio'),
      activeStep: 3,
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
          <ActionButton color="primary" onClick={() => this.setState({showFindCustomer: true})}>Buscar Cliente</ActionButton>
          <ActionButton color="primary" onClick={this.displayClientForm}>Nuevo Cliente</ActionButton>
          <SelectCustomerDialog
            open={this.state.showFindCustomer}
            close={() => this.setState({showFindCustomer: false})}
            handleCustomer={this.handleCustomer}/>
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
        <h2>Agrega un Codeudor al Credito</h2>
        <ActionsContainer>
          <ActionButton color="primary" onClick={() => this.setState({showFindGuarantor: true})}>Buscar Codeudor</ActionButton>
          <ActionButton color="primary" onClick={this.displayGuarantorForm}>Nuevo Codeudor</ActionButton>
          <SelectCustomerDialog
            open={this.state.showFindGuarantor}
            close={() => this.setState({showFindGuarantor: false})}
            handleCustomer={this.handleGuarantor}/>
        </ActionsContainer>
      </Fragment>
    )
  }

  renderPurchaseForm = () => {
    if (!isPurchaseStep(this.state)) return null
    if (missingCustomer(this.state.credit.customer)) return <div><h1>Necesitas Agregar un Cliente</h1></div>
    return  <NewPurchaseForm customer={this.state.credit.customer} handleSubmit={this.handlePurchase} purchase={this.state.credit.purchase}/>
  }
  renderCreditInfoForm = () => {
    if (!isCreditStep(this.state)) return null
    if (missingPurchase(this.state.credit.purchase)) return <div><h1>Necesitas Agregar un Negocio</h1></div>
    return <NewCreditInfoForm purchase={this.state.credit.purchase} loan={this.state.credit.loan} handleSubmit={this.handleLoan}/>
  }

  render() {
    return (
      <main>
        <Stepper steps={this.state.steps} activeStep={this.state.activeStep} handleStep={this.handleStep}>
          <h1>Nuevo Crédito</h1>
        </Stepper>
        <Main>
          <Workspace>
            {this.renderCustomerForm()}
            {this.renderGuarantorForm()}
            {this.renderPurchaseForm()}
            {this.renderCreditInfoForm()}
          </Workspace>
          <Viewer display={!shouldShowCreditInfo(this.state.credit.customer)}>
            <CreditInfo {...this.state.credit}/>
          </Viewer>
        </Main>
      </main>
    )
  }
}

// Temporal para prueba
const mapActions = {
  fetchCustomers,
  fetchPurchase,
}

// Temporal para prueba
const mapStateToProps = state => {
  return ({
    // customer: getCustomerCollection(state)[0],
    // guarantor: getCustomerCollection(state)[1],
    // purchase: getPurchaseCollection(state)[0]
  })
}

export default connect(mapStateToProps, mapActions)(NewCreditForm)