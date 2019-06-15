import React, {Component} from 'react'
import {connect} from 'react-redux'
import InventoryItem from '../../model/inventory-item'
import Crud from '../../components/crud'
import {fetchProducts} from '../../redux/actions/creators/product'
import {getInventoryCollection} from '../../selectors/inventoryItem'
import {fetchInventory, saveInventory} from '../../redux/actions/creators/inventory-item'

class PurchaseView extends Component {
  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchInventory()
  }
  render() {
    const {inventoryItems, saveInventory} = this.props
    return (
      <main>
        <Crud model={InventoryItem} collection={inventoryItems} onSave={saveInventory}/>
      </main>
    )
  }
}

const  mapStateToProps = state => ({
  inventoryItems: getInventoryCollection(state)
})

const mapActions = {
  fetchProducts,
  fetchInventory,
  saveInventory,
}

export default connect(mapStateToProps, mapActions)(PurchaseView)