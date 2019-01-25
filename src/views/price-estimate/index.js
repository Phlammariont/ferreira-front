import React from 'react'
import Crud from '../../components/crud'
import priceEstimation from '../../model/priceEstimation'
import NewPriceEstimation from './NewPriceEstimation'

export default props => (
  <main>
    <Crud
      model={priceEstimation}
      newModelForm={NewPriceEstimation}/>
  </main>
)