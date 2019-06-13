import React, {useEffect} from 'react'
import Purchase from '../../model/purchase'
import Crud from '../../components/crud'
import {fetchCustomers} from '../../redux/actions/creators/customer'
import {connect} from 'react-redux'
import {getPurchaseCollection} from '../../selectors/purchase'
import {fetchProducts} from '../../redux/actions/creators/product'

const PurchaseView = props => {
  useEffect(() => {
    props.fetchCustomers()
    props.fetchProducts()
  })
  return (
    <main>
      <Crud model={Purchase} collection={props.purchases}/>
    </main>
  )
}

const  mapStateToProps = state => ({
  purchases: getPurchaseCollection(state)
})

const mapActions = {
  fetchCustomers,
  fetchProducts,
}

export default connect(mapStateToProps, mapActions)(PurchaseView)