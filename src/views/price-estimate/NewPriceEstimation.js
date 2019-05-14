import React, {Component} from 'react'
import { connect } from 'react-redux'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import quotationService from '../../service/quotation'
import Autocomplete from '../../components/autocomplete'
import { getCustomerCollection } from '../../selectors/customer'
import { getProductCollection } from '../../selectors/product'
import Multiselect from '../../components/multiselect'

class NewPriceEstimation extends Component{
  constructor (props) {
    super(props)
    this.state = {
      newEstimation: {}
    }
  }

  handleChange = field => selection => {
    this.setState({
      newEstimation: {
        ...this.state.newEstimation,
        [field]: selection
      }
    })
  }

  saveEstimation = async () => {
    await quotationService.save(this.state.newEstimation)
    this.props.onSave && this.props.onSave()
    this.setState({newEstimation: {}})
    this.props.onClose && this.props.onClose()
  }

  render () {
    return (
      <div>
        <DialogContent>
          <DialogContentText>
            Nombre del producto y valor.
          </DialogContentText>
          <Autocomplete
            data={this.props.customers}
            label='Customer'
            itemField='name'
            fullWidth
            onChange={this.handleChange('customer')}
          />
          <Multiselect
            data={this.props.products}
            label='Products'
            itemField='name'
            fullWidth
            onChange={this.handleChange('products')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.saveEstimation} color="primary">
            Save
          </Button>
        </DialogActions>
      </div>
    )
  }
}

const stateToProps = state => ({
  customers: getCustomerCollection(state),
  products: getProductCollection(state)
})

export default connect(stateToProps)(NewPriceEstimation)