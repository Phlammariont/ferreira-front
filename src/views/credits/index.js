import React, {useEffect} from 'react'
import Crud from '../../components/crud'
import CreditInfo from '../../model/creditInfo'
import {connect} from 'react-redux'
import {getPurchaseCollection} from '../../selectors/purchase'
import { fetchCustomers } from '../../redux/actions/creators/customer'

const PurchaseView = props => {
  useEffect( () => {
    props.fetchCustomers()
  })
  return (
    <main>
      <Crud model={CreditInfo} collection={props.purchases}/>
    </main>
  )
}

const  mapStateToProps = state => ({
  purchases: getPurchaseCollection(state)
})

const mapActions = {
  fetchCustomers,
}

export default connect(mapStateToProps, mapActions)(PurchaseView)
