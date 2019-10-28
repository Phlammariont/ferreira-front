import React, {Component, Fragment} from 'react'
import NewCustomerForm from '../customer/NewCustomerForm'
import NewPurchaseForm from '../purchase/NewPurchaseForm'
import NewCreditInfoForm from './NewCreditInfoForm'
import Stepper from '../../components/stepper'
import Workspace from '../../components/workspace'
import Viewer from '../../components/viewer'
import {map, propEq} from 'ramda'
import CreditInfo from './CreditInfo'
import {ActionButton, ActionsContainer} from '../../components/layout'
import {getCustomerCollection} from '../../selectors/customer'
import {connect} from 'react-redux'
import {fetchCustomers} from '../../redux/actions/creators/customer'
import SelectCustomerDialog from '../customer/SelectCustomerDialog'

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
    const { customer } = props
    this.state = {
      activeStep: 0,
      steps: [
        { title: 'Datos del Cliente', complete: false },
        { title: 'Datos del Codeudor', complete: false },
        { title: 'Datos del Negocio', complete: false },
        { title: 'Datos del Credito', complete: false },
      ],
      credit: {
        purchaseItems: [],
        customer,
      },
    }
  }

  componentDidMount () {
    this.props.fetchCustomers()
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

  handlePurchaseLine = ({items, price}) => {
    this.setState({
      credit:{...this.state.credit, purchaseItems: [...this.state.credit.purchaseItems, {items, price}]},
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
    return  <NewPurchaseForm customer={this.state.credit.customer} handlePurchaseLine={this.handlePurchaseLine}/>
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

const mapActions = {
  fetchCustomers,
}

const mapStateToProps = state => ({
  customer: getCustomerCollection(state)[0]
})

export default connect(null, mapActions)(NewCreditForm)