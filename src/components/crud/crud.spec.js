import React from 'react';
import {cleanup, render} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Crud from './index';
import ModelForm from './model-form'
import Model from './model'

class ProductModel extends Model {
  name = 'Producst'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' }
  ]
}

class PriceModel extends Model {
  name = 'Price'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'price', label: 'Precios'}
  ]

  toString() {
    return this.model.name + " - $" + this.model.price
  }
}

class GeneralModel extends Model {
  name = 'General Model'
  fields = [
    { name: 'id', label: 'id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'email', label: 'E-Mail'},
    { name: 'product', label: 'Product', instanceOf: ProductModel },
    { name: 'prices', label: 'Precios', instanceOf: [PriceModel] },
  ]
}

const generalCollection = [
  {
    id: '1234-5678',
    name: 'general 1',
    email: 'general@ferreira.com',
    product: { id: 1, name: 'general product' },
    prices: [ { id: 'first', name: 'precio 1', price: 100 }, { id: 'second', name: 'precio 2', price: 200 } ]
  }
]

const renderComponent = (props ={}) => {
  return render(
    <Crud {...props}/>,
  )
}

describe('In a suite of tests for the Quotation view', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    renderComponent({
      newModelForm: ModelForm,
      model: GeneralModel,
      collection: generalCollection
    })
  })

  it('Should show a list of field labels as headers', () => {
    const { getByText } = renderComponent({
      newModelForm: ModelForm,
      model: GeneralModel,
      collection: generalCollection
    })

    expect(() => {
      getByText('id') //non visible element
    }).toThrow()
    expect(getByText('Nombre')).toBeDefined()
    expect(getByText('Nombre')).toBeVisible()
    expect(getByText('E-Mail')).toBeDefined()
    expect(getByText('E-Mail')).toBeVisible()
    expect(getByText('Product')).toBeDefined()
    expect(getByText('Product')).toBeVisible()
  })

  it('Should show a list of quotations', () => {
    const { getByText } = renderComponent({
      newModelForm: ModelForm,
      model: GeneralModel,
      collection: generalCollection
    })

    expect(() => {
      getByText('1234-5678') //non visible element
    }).toThrow()
    expect(getByText('general 1')).toBeDefined()
    expect(getByText('general 1')).toBeVisible()
    expect(getByText('general@ferreira.com')).toBeDefined()
    expect(getByText('general@ferreira.com')).toBeVisible()
  })

  it('Should show a list of quotations with nested models', () => {
    const { getByText } = renderComponent({
      newModelForm: ModelForm,
      model: GeneralModel,
      collection: generalCollection
    })

    expect(() => {
      getByText('1234-5678') //non visible element
    }).toThrow()
    expect(getByText('general 1')).toBeDefined()
    expect(getByText('general 1')).toBeVisible()
    expect(getByText('general@ferreira.com')).toBeDefined()
    expect(getByText('general@ferreira.com')).toBeVisible()
    expect(getByText('general product')).toBeDefined()
    expect(getByText('general product')).toBeVisible()
    expect(getByText(/precio 1/)).toBeDefined()
    expect(getByText(/precio 1/)).toBeVisible()
  })

  it('Should show item with their toString method', () => {
    const { getByText } = renderComponent({
      newModelForm: ModelForm,
      model: GeneralModel,
      collection: generalCollection
    })

    expect(() => {
      getByText('1234-5678') //non visible element
    }).toThrow()
    expect(getByText(/precio 1 - /)).toBeDefined()
    expect(getByText(/precio 2 - [$]200/)).toBeVisible()
  })
})

