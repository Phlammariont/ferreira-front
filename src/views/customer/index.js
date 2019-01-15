import React, {Component} from 'react'
import Crud from '../../components/crud'
import customer from '../../model/customer'
import NewCustomerForm from './NewCustomerForm'
import customerService from '../../service/customer'

class CustomerView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customers: []
    }
  }

  componentDidMount () {
    customerService.get()
      .then(customers => {
        return this.setState({customers})
      })
    customerService.onAdd(customers => this.setState({customers}))
  }

  render () {
    return (
      <main>
        <Crud model={customer} newModelForm={NewCustomerForm} collection={this.state.customers}/>
      </main>
    )
  }
}

export default CustomerView