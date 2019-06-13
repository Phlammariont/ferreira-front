import React from 'react'
import Crud from '../../components/crud'
import CreditInfo from '../../model/creditInfo'
import {connect} from 'react-redux'
import {getPurchaseCollection} from '../../selectors/purchase'

const PurchaseView = props => (
  <main>
    <Crud model={CreditInfo} collection={props.purchases}/>
  </main>
)

const  mapStateToProps = state => ({
  purchases: getPurchaseCollection(state)
})

export default connect(mapStateToProps)(PurchaseView)
