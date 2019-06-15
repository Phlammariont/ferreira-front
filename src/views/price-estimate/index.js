import React, {Component} from 'react'
import Crud from '../../components/crud'
import Quotation from '../../model/quotation'
import NewPriceEstimation from './NewPriceEstimation'
import { fetchCustomers } from '../../redux/actions/creators/customer'
import { fetchProducts } from '../../redux/actions/creators/product'
import { setQuotationCollection } from '../../redux/actions/creators/quotation'
import {connect} from 'react-redux'
import quotationService from '../../service/quotation'
import {getQuotationCollection} from '../../selectors/quotation'

class PriceEstimationView extends Component {

  componentDidMount () {
    quotationService.onAdd(this.props.setQuotationCollection)
    this.props.fetchCustomers()
    this.props.fetchProducts()
  }

  render() {
    return (
      <main>
        <Crud
          model={Quotation}
          newModelForm={NewPriceEstimation}
          collection={this.props.quotations}/>
      </main>
    )
  }
}

const mapDispatch = {
  fetchCustomers,
  fetchProducts,
  setQuotationCollection,
}

const mapStateToProps = state => ({
  quotations: getQuotationCollection(state)
})

export default connect(mapStateToProps, mapDispatch)(PriceEstimationView)
