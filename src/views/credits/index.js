import React, {useEffect} from 'react'
import Crud from '../../components/crud'
import CreditInfo from '../../model/creditInfo'
import {connect} from 'react-redux'
import {getPurchaseCollection} from '../../selectors/purchase'
import { fetchCustomers } from '../../redux/actions/creators/customer'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'


const PurchaseView = props => {
  useEffect( () => {
    props.fetchCustomers()
  })
  return (
    <main>
      <div style={{'text-align': 'left', padding: '20px'}}>
        <Link to="/credits/new">
          <Button variant="contained" >
            Nuevo Crédito
          </Button>
        </Link>
      </div>
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
