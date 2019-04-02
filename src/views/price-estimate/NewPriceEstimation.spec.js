import {render, fireEvent, waitForElement, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import NewPriceEstimation from './NewPriceEstimation'
import React from 'react'
import store from '../../redux'
import {Provider} from 'react-redux'

describe('In a suit test for NewPriceEstimation Component', () => {
  afterEach(cleanup)

  const createForm = ({initialState = {}, props}) => {
    return render(
      <Provider store={store(initialState)}>
        <NewPriceEstimation {...props}/>,
      </Provider>
    )
  }
  it('Should have 2 autocompletes', () => {
    const { getByLabelText, getByText } = createForm({})
    expect( getByLabelText('Customer') ).toBeDefined()
    expect( getByLabelText('Product') ).toBeDefined()
    expect( getByText('Save') ).toBeDefined()
    expect( getByText('Cancel') ).toBeDefined()
  })

  it('Should let the user to select a user', async () => {
    const { getByLabelText, getByText } = createForm({initialState: {
      customer: {
        collection: [
          {name: 'leon', id:1}
        ]
      },
      product: {
        collection: [
          {name: 'cama', id:1}
        ]
      }
    }})
    const customerInput = getByLabelText('Customer')
    fireEvent.change(customerInput, { target: { value: 'leo' } })
    const customerOption = await waitForElement(
      () => getByText('leon'),
    )
    const productInput = getByLabelText('Product')
    fireEvent.change(productInput, { target: { value: 'cam' } })
    const productOption = await waitForElement(
      () => getByText('cama'),
    )
    fireEvent.click(customerOption)
    fireEvent.click(productOption)
  })
})