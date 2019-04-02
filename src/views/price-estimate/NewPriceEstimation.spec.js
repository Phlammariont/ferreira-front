import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import NewPriceEstimation from './NewPriceEstimation'
import React from 'react'
import store from '../../redux'
import {Provider} from 'react-redux'

describe('In a suit test for NewPriceEstimation Component', () => {
  const createForm = (props = {initialState}) => {
    return render(
      <Provider store={store(initialState)}>
        <NewPriceEstimation {...props}/>,
      </Provider>
    )
  }
  it('Should have 2 autocompletes', () => {
    const { getByLabelText, getByText } = createForm()
    expect( getByLabelText('Customer') ).toBeDefined()
    expect( getByLabelText('Product') ).toBeDefined()
    expect( getByText('Save') ).toBeDefined()
    expect( getByText('Cancel') ).toBeDefined()
  })
  it('Should let the user to select a user', async () => {
    const { getByLabelText, getByTest } = createForm({initialState: {
      customer: [
        {name: 'leon'}
      ]
    }})
    const customerInput = getByLabelText('Customer')
    fireEvent.change(input, { target: { value: 'leon' } })
    const customerOption = await waitForElement(
      () => getByTest('leon'),
    )
    fireEvent
  })
})