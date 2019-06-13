import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import InventoryItem from '../../model/inventory-item'
import Crud from '../../components/crud'
import {fetchProducts} from '../../redux/actions/creators/product'
import {getInventoryCollection} from '../../selectors/inventoryItem'
import {saveInventory} from '../../redux/actions/creators/inventory'

const PurchaseView = props => {
  useEffect(() => {
    props.fetchProducts()
  })
  return (
    <main>
      <Crud model={InventoryItem} collection={props.inventoryItems} onSave={props.saveInventory}/>
    </main>
  )
}

const  mapStateToProps = state => ({
  inventoryItems: getInventoryCollection(state)
})

const mapActions = {
  fetchProducts,
  saveInventory,
}

export default connect(mapStateToProps, mapActions)(PurchaseView)