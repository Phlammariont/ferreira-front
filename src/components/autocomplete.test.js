import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Autocomplete from './autocomplete';

const unmountAutocomplete = (component) => {
  ReactDOM.unmountComponentAtNode(component);
}

const createAutocomplete = ( props = {} ) => {
  return render(
    <Autocomplete {...props}/>,
  )
}

afterEach(cleanup)

describe('Suit tests for Autocomplete Component', () => {
  it('renders without crashing', () => {
    const { container } = createAutocomplete()
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
  it('can be navigated with arrow keys', () => {

  })
  it('An option can be selected on click', () => {

  })
})
