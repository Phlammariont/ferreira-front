import React from 'react'
import Purchase from '../../model/purchase'
import NewPurchase from './NewPurchase'
import Crud from '../../components/crud'

export default (props) => (
  <main>
    <Crud model={Purchase} newModelForm={NewPurchase} collection={props.purchases}/>
  </main>
)