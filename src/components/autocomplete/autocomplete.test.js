import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Autocomplete from './autocomplete'

const createAutocomplete = ( props = {} ) => {
  return render(
    <Autocomplete {...props}/>,
  )
}

describe('Suit tests for Autocomplete Component', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const { container } = createAutocomplete()
    expect(container).toBeDefined()
  })

  it('render an input', () => {
    const LABEL = 'users'
    const { getByLabelText } = createAutocomplete({label: LABEL})
    const input = getByLabelText(LABEL)
    expect(input).toBeDefined()
  })

  it('render a list when 3 characters on the input', async () => {
    const LABEL = 'users'
    const { getByLabelText, getByText, container } = createAutocomplete({
      data: [{name: 'leon'}],
      itemField: 'name',
      label: LABEL,
    })
    const input = getByLabelText(LABEL)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: 'leo' } })
    const usernameElement = await waitForElement(
      () => getByText('leon'),
    )
    expect(usernameElement).toBeDefined()
    expect(usernameElement).toBeVisible()
  })
  it('dont render a list when 3 characters on the input with no matches', async () => {
    const LABEL = 'users'
    const { getByLabelText, getByText, getByTestId } = createAutocomplete({
      data: [{name: 'leon'}],
      itemField: 'name',
      label: LABEL,
    })
    const input = getByLabelText(LABEL)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: 'ccc' } })
    const list = await waitForElement(
      () => getByTestId('autocomplete-list'),
    )
    expect(list).toContainHTML('')
  })

  it('let the suer select an option', async () => {
    const onChange = jest.fn()
    const LABEL = 'users'
    const { getByLabelText, getByText } = createAutocomplete({
      data: [{name: 'alejandra'}, {name: 'leon'}],
      itemField: 'name',
      label: LABEL,
      onChange
    })
    const input = getByLabelText(LABEL)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: 'leo' } })
    const option = await waitForElement(
      () => getByText('leon'),
    )
    fireEvent.click(option)
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toEqual({name: 'leon'})
  })
})
