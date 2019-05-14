import React from 'react'
import {render, fireEvent, cleanup, waitForElement, wait} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Multiselect from './index'

const label = 'Products'
const data = [
  { name: 'cama single', price: 200 },
  { name: 'cama double', price: 200 },
  { name: 'cama queen', price: 200 },
  { name: 'cama king', price: 200 },
]
const itemField = 'name'

const createAutocomplete = ( props = {} ) => {
  return render(
    <Multiselect {...props}/>,
  )
}

describe('Suit tests for Autocomplete Component', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const {container} = createAutocomplete({label})
    expect(container).toBeDefined()
  })

  it('have an input with the label for it', () => {
    const {getByLabelText} = createAutocomplete({label})
    expect(getByLabelText(label)).toBeDefined()
  })

  test('the user can search an option and click it', async () => {
    const { getByLabelText, getByTestId } = createAutocomplete({ label, data, itemField })
    const input = getByLabelText(label)
    expect(input).toBeDefined()
    expect(input).toBeVisible()
    fireEvent.change(input, { target: { value: 'ccc' } })
    const list = await waitForElement(
      () => getByTestId('autocomplete-list'),
    )
    expect(list).toContainHTML('')
  })

  test('on selecting the option the selected option is visible', async() => {
    const { getByLabelText, getByTestId, getByText } = createAutocomplete({ label, data, itemField, onChange: console.log})
    const input = getByLabelText(label)
    expect(input).toBeDefined()
    expect(input).toBeVisible()
    fireEvent.change(input, { target: { value: 'king' } })
    const option = await waitForElement(
      () => getByText('cama king'),
    )
    fireEvent.click(option)

    const selectedOptions = await waitForElement(
      () => getByTestId('selected-options'),
    )
    expect(selectedOptions).toBeVisible()
    const selectedOption = await waitForElement(
      () => getByText('cama king')
    )
    expect(selectedOption).toBeVisible()
  })
  test('on selecting the option the input is cleared', () => {
    //TODO @leon
  })
  test('the user can select 2 options', async () => {
    const { getByLabelText, getByTestId, getByText } = createAutocomplete({ label, data, itemField, onChange: console.log})
    const input = getByLabelText(label)
    fireEvent.change(input, { target: { value: 'king' } })
    const option = await waitForElement(
      () => getByText('cama king'),
    )
    fireEvent.click(option)
    const selectedOptions = await waitForElement(
      () => getByTestId('selected-options'),
    )
    expect(selectedOptions).toBeVisible()
    const firstSelectedOption = getByText('cama king')
    expect(firstSelectedOption).toBeVisible()
    fireEvent.change(input, { target: { value: 'queen' } })
    const secondOption = await waitForElement(
      () => getByText('cama queen'),
    )
    fireEvent.click(secondOption)
    const seconsSelectedOption = await waitForElement(
      () => getByText('cama queen')
    )
    expect(seconsSelectedOption).toBeVisible()
    expect(firstSelectedOption).toBeVisible()
  })
  test('the onChange callback is called with the selected options', async () => {
    const callback = jest.fn()
    const { getByLabelText, getByTestId, getByText } = createAutocomplete({ label, data, itemField, onChange: callback})
    const input = getByLabelText(label)
    fireEvent.change(input, { target: { value: 'king' } })
    const option = await waitForElement(
      () => getByText('cama king'),
    )
    fireEvent.click(option)
    const selectedOptions = await waitForElement(
      () => getByTestId('selected-options'),
    )
    expect(selectedOptions).toBeVisible()
    expect(callback).toHaveBeenCalled()
  })
  test('an option can be removed', async () => {
    const callback = jest.fn()
    const { getByLabelText, getByTestId, getByText } = createAutocomplete({ label, data, itemField, onChange: callback})
    const input = getByLabelText(label)
    fireEvent.change(input, { target: { value: 'king' } })
    const option = await waitForElement(
      () => getByText('cama king'),
    )
    fireEvent.click(option)
    const selectedOptions = await waitForElement(
      () => getByTestId('selected-options'),
    )
    expect(selectedOptions).toBeVisible()
    expect(callback).toHaveBeenCalled()

    const deleteOption = getByText('X')
    expect(deleteOption).toBeVisible()
    fireEvent.click(deleteOption)
    //waitToBeCalled(callback)
    //expect(selectedOptions).not.toBeVisible()
    // const result = await waitForElement(
    //   () => expect(selectedOptions).not.toBeVisible()
    // )
    await wait(() =>
      expect(selectedOptions).not.toBeInTheDocument(),
    )
  })
})
