import React from 'react'
import {render, cleanup, fireEvent, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'
import store from '../../redux'
import {Provider} from 'react-redux'
import NewCreditForm from './NewCreditForm'

describe('In a suit test for the NewCreditForm Component', () => {
  afterEach(cleanup)

  const createView = ({initialState = {}, props}) => {
    return render(
      <Provider store={store(initialState)}>
        <NewCreditForm {...props}/>,
      </Provider>
    )
  }
  it('Render without crashing ', () => {
    createView({})
  })
  it('render the stepper and the buttons of customers', () => {
    const { getByText } = createView({})
    expect(getByText('Datos del Cliente')).toBeDefined()
    expect(getByText('Datos del Codeudor')).toBeDefined()
    expect(getByText('Buscar Cliente')).toBeVisible()
    expect(getByText('Nuevo Cliente')).toBeVisible()
  })

  it('render a form for the customer', () => {
    const { getByText, getByLabelText } = createView({})
    const newCustomerButton = getByText('Nuevo Cliente')
    fireEvent.click(newCustomerButton)
    waitForElement(() => getByLabelText('Nombre'))
  })
})
