import React, {Component} from 'react'
import Purchase from '../../model/purchase'
import Crud from '../../components/crud'
import {fetchCustomers} from '../../redux/actions/creators/customer'
import {connect} from 'react-redux'
import {getPurchaseCollection} from '../../selectors/purchase'
import {fetchInventory} from '../../redux/actions/creators/inventory-item'
import {fetchPurchase, savePurchase} from '../../redux/actions/creators/purchase'

class PurchaseView extends Component{
  componentDidMount() {
    this.props.fetchCustomers()
    this.props.fetchInventory()
    this.props.fetchPurchase()
  }
  render () {
    return (
      <main>
        <Crud model={Purchase} collection={this.props.purchases} onSave={this.props.savePurchase}/>
      </main>
    )
  }
}

const  mapStateToProps = state => ({
  purchases: getPurchaseCollection(state)
})

const mapActions = {
  fetchCustomers,
  fetchInventory,
  fetchPurchase,
  savePurchase,
}

export default connect(mapStateToProps, mapActions)(PurchaseView)