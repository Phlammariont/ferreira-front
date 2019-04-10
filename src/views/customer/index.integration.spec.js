import {render, fireEvent, waitForElement, cleanup} from 'react-testing-library'
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
    const { getByLabelText, getByText } = createView({})
  })
  it('render a list of customers', () => {
    const { getByText } = createView({ initialState: { customer: { collection: [ {name: 'leon', email: 'leon@ferreira.com'} ] } } })
    expect(getByText('leon')).toBeDefined()
    expect(getByText('leon@ferreira.com')).toBeDefined()
  })
})
