import React from 'react';
import PriceEstimation from './index';
import store from '../../redux'
import {Provider} from 'react-redux'
import {cleanup, render} from 'react-testing-library'

const renderComponent = (initialState, props ={}) => {
  return render(
    <Provider store={store(initialState)}>
      <PriceEstimation {...props}/>,
    </Provider>
  )
}

describe('In a suite of tests for the Quotation view', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    renderComponent({})
  })

  it('Should show a list of quotations', () => {
    const { getByText } = renderComponent({
      quotation: {
        collection: [{ id: '001', customer: { id: '002', name:'leon'}, products: [{id: '003', name: 'cama'}] }]
      }
    })
    expect(getByText('leon')).toBeDefined()
    expect(getByText('cama')).toBeDefined()
  })
})

