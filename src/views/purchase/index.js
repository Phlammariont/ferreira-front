import React from 'react'
import Purchase from '../../model/purchase'
import Crud from '../../components/crud'

export default (props) => (
  <main>
    <Crud model={Purchase} collection={props.purchases}/>
  </main>
)