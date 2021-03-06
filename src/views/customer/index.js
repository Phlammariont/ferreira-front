import React, {Component} from 'react'
import Crud from '../../components/crud'
import customer from '../../model/customer'
import NewCustomerForm from './NewCustomerForm'
import {getCustomerCollection} from '../../selectors/customer'
import { fetchCustomers } from '../../redux/actions/creators/customer'
import {connect} from 'react-redux'

class CustomerView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customers: []
    }
  }

  componentDidMount () {
    this.props.fetchCustomers()
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
}

const stateToProps = state => ({
  customers: getCustomerCollection(state),
})

export default connect(stateToProps, mapActions)(CustomerView)