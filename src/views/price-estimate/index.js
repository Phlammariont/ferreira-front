import React from 'react'
import Crud from '../../components/crud'
import priceEstimation from '../../model/priceEstimation'

export default props => (
  <main>
    <Crud model={priceEstimation} />
  </main>
)