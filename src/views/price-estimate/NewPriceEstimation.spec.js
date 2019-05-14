import { render, fireEvent, waitForElement, cleanup, wait } from 'react-testing-library'
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

const setupForm = (callback) => {
  return createForm({initialState: {
    customer: {
      collection: [
        {name: 'leon', id:1}
      ]
    },
    product: {
      collection: [
        { name: 'cama', id: 1 },
        { name: 'silla', id: 2 }
      ]
    }
  },
  props: {
    onSave: callback
  }})
}

describe('In a suit test for NewPriceEstimation Component', () => {
  afterEach(cleanup)

  it('Should have 2 autocompletes', () => {
    const { getByLabelText, getByText } = createForm({initialState:{}})
    expect( getByLabelText('Customer') ).toBeDefined()
    expect( getByLabelText('Products') ).toBeDefined()
    expect( getByText('Save') ).toBeDefined()
    expect( getByText('Cancel') ).toBeDefined()
  })

  it('Should let the user to select a user', async () => {
    const { getByText, getByLabelText } = setupForm()
    const customerInput = getByLabelText('Customer')
    fireEvent.change(customerInput, { target: { value: 'leo' } })
    const customerOption = await waitForElement(
      () => getByText('leon'),
    )
    const productInput = getByLabelText('Products')
    fireEvent.change(productInput, { target: { value: 'cam' } })
    const productOption = await waitForElement(
      () => getByText('cama'),
    )
    fireEvent.click(customerOption)
    fireEvent.click(productOption)
  })

  test('if the user does not exist we have an option to create a new one', async () => {
    const { getByText, getByLabelText } = setupForm()
    const customerInput = getByLabelText('Customer')
    fireEvent.change(customerInput, { target: { value: 'xxx' } })
    // TODO @Leon: const customerOption = await waitForElement(
    //   () => getByText('Agregar Un Usuario Nuevo'),
    // )
  })
  test('the user can pick a product', async () => {
    const { getByText, getByLabelText } = setupForm()
    fireEvent.change(getByLabelText('Customer'), { target: { value: 'leo' } })
    const customerOption = await waitForElement(
      () => getByText('leon'),
    )
    fireEvent.click(customerOption)
    fireEvent.change(getByLabelText('Products'), { target: { value: 'cam' } })
    const productOption = await waitForElement(
      () => getByText('cama'),
    )
    fireEvent.click(productOption)
  })
  test('the user can pick more than a product', async () => {
    const { getByText, getByLabelText } = setupForm()
    fireEvent.change(getByLabelText('Products'), { target: { value: 'sil' } })
    const productOption = await waitForElement(
      () => getByText('silla'),
    )
    fireEvent.click(productOption)
    fireEvent.change(getByLabelText('Products'), { target: { value: 'cam' } })
    const product2Option = await waitForElement(
      () => getByText('cama'),
    )
    fireEvent.click(product2Option)
  })
  test('a new quotation is ready to be saved and the callback is executed', async () => {
    const callback = jest.fn()
    const { getByText, getByLabelText } = setupForm(callback)
    fireEvent.change(getByLabelText('Customer'), { target: { value: 'leo' } })
    const customerOption = await waitForElement(
      () => getByText('leon'),
    )
    fireEvent.click(customerOption)
    fireEvent.change(getByLabelText('Products'), { target: { value: 'sil' } })
    const productOption = await waitForElement(
      () => getByText('silla'),
    )
    fireEvent.click(productOption)
    fireEvent.change(getByLabelText('Products'), { target: { value: 'cam' } })
    const product2Option = await waitForElement(
      () => getByText('cama'),
    )
    fireEvent.click(product2Option)
    const saveButton = getByText('Save')
    // fireEvent.click(saveButton)
    // await wait(() =>
    //   expect(callback).toHaveBeenCalled()
    // )
  })
})