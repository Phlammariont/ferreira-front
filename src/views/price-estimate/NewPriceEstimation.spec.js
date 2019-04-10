import {render, fireEvent, waitForElement, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import NewPriceEstimation from './NewPriceEstimation'
import React from 'react'
import createAppStore from '../../redux'
import {Provider} from 'react-redux'

const createForm = ({initialState = {}, props={}}) => {
  return render(
    <Provider store={createAppStore(initialState)}>
      <NewPriceEstimation {...props}/>,
    </Provider>
  )
}

describe('In a suit test for NewPriceEstimation Component', () => {
  afterEach(cleanup)

  it('Should have 2 autocompletes', () => {
    const { getByLabelText, getByText } = createForm({initialState:{}})
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