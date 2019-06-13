import {render, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import CustomerView from './index'
import React from 'react'
import store from '../../redux'
import {Provider} from 'react-redux'

describe('In a suit test for CustomerView Component', () => {
  afterEach(cleanup)

  const createView = ({initialState = {}, props}) => {
    return render(
      <Provider store={store(initialState)}>
        <CustomerView {...props}/>,
      </Provider>
    )
  }
  it('Render without crashing ', () => {
    createView({})
  })
  it('render a list of customers', () => {
    const { getByText } = createView({
      initialState: { customer: { collection: [ { id: '001', name: 'leon', email: 'leon@ferreira.com'} ] } }
    })
    expect(getByText('leon')).toBeDefined()
    expect(getByText('leon@ferreira.com')).toBeDefined()
  })

  it('render a new model button', () => {
    const { getByText, getByTestId } = createView({
      initialState: { customer: { collection: [ { id: '001', name: 'leon', email: 'leon@ferreira.com'} ] } }
    })
    expect(getByTestId('new-model-fab')).toBeDefined()
  })
})
