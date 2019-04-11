import React, {Component} from 'react'
import Crud from '../../components/crud'
import customer from '../../model/customer'
import NewCustomerForm from './NewCustomerForm'
import customerService from '../../service/customer'
import {getCustomerCollection} from '../../selectors/customer'
import { fetchCustomers, setCustomerCollection } from '../../redux/actions/creators/customer'
import {connect} from 'react-redux'

class CustomerView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customers: []
    }
  }

  componentDidMount () {
    customerService.onAdd(this.props.setCustomerCollection)
  }

  render () {
    return (
      <main>
        <Crud model={customer} newModelForm={NewCustomerForm} collection={this.props.customers}/>
      </main>
    )
  }
}

const mapActions = {
  fetchCustomers,
  setCustomerCollection
}

const stateToProps = state => ({
  customers: getCustomerCollection(state),
})

export default connect(stateToProps, mapActions)(CustomerView)