import React from 'react';
import { cleanup, render, fireEvent, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import store from '../../redux'
import ModelForm from './model-form'
import Model from './model'
import {Provider} from 'react-redux'

class ProductModel extends Model {
  name = 'product'
  label = 'Producto'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' }
  ]
}

class PriceModel extends Model {
  name = 'price'
  label = 'Precio'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'price', label: 'Precio'}
  ]

  toString() {
    return this.model.label + " - $" + this.model.price
  }
}

class GeneralModel extends Model {
  name = 'generalModel'
  label = 'General Model'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'email', label: 'E-Mail'},
    { name: 'product', label: 'Product', instanceOf: ProductModel },
    { name: 'prices', label: 'Prices', instanceOf: [PriceModel] },
  ]
}

const pricesCollection = [
  { id: 'first', name: 'precio 1', price: 100 },
  { id: 'second', name: 'precio 2', price: 200 }
]

const initialState = {price:{collection: pricesCollection}}

const renderComponent = (props ={}) => {
  return render(
    <Provider store={ store(initialState) }>
      <ModelForm {...props}/>,
    </Provider>
  )
}

describe('In a suite of tests for the Generic New Model Form', () => {
  afterEach(cleanup)

  it('should render without crashing', () => {
    renderComponent({
      model: GeneralModel,
    })
  })

  it('should render the title', () => {
    const { getByText } = renderComponent({
      model: GeneralModel,
    })

    expect(getByText(/General Model/)).toBeVisible()
  })

  it('should render an input for a text field', () => {
    const { getByLabelText } = renderComponent({
      model: GeneralModel,
    })

    expect(getByLabelText('Nombre')).toBeVisible()
  })

  it('should render an Autocomplete  for a model field', () => {
    const { getByLabelText } = renderComponent({
      model: GeneralModel,
    })

    const productTxt = getByLabelText('Product')

    expect(productTxt).toBeVisible()
  })

  it('should render an Multiselect for a model field', () => {
    const { getByLabelText } = renderComponent({
      model: GeneralModel,
    })

    expect(getByLabelText('Prices')).toBeVisible()
  })
})
