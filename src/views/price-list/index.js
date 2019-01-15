import React, {Component} from 'react'
import priceService from '../../service/price-service'
import Crud from '../../components/crud'
import priceList from '../../model/priceList'
import NewPriceForm from './new-price-list'

class PriceList extends Component{
  constructor (props) {
    super(props)
    this.state = {
      priceList: []
    }
  }

  componentDidMount () {
    priceService.get()
      .then(priceList => {
        return this.setState({priceList})
      })
    priceService.onAdd(priceList => this.setState({priceList}))
  }

  render () {
    return (
      <div>
        <Crud
          model={priceList}
          collection={this.state.priceList}
          newModelForm={NewPriceForm}/>
      </div>
    )
  }
}


export default PriceList