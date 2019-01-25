import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'
import priceService from '../../service/price-service'
import Autocomplete from '../../components/autocomplete'

class NewPriceEstimation extends Component{
  constructor (props) {
    super(props)
    this.state = {
      newEstimation: {

      }
    }
  }

  handleChange = (field) => ( evt ) => {
    this.setState({
      newEstimation: {
        ...this.state.newEstimation,
        [field]: evt.target.value
      }
    })
  }

  saveEstimation = () => {
    priceService.save(this.state.newEstimation)
    this.setState({newEstimation: {}})
    this.props.onClose()
  }

  render () {
    return (
      <div>
        <DialogContent>
          <DialogContentText>
            Nombre del producto y valor.
          </DialogContentText>
          <Autocomplete
            autoFocus
            margin="dense"
            id="name"
            label="Cliente"
            type="email"
            fullWidth
            onChange={this.handleChange('customer')}
          />
          <Autocomplete
            margin="dense"
            id="name"
            label="Productos"
            type="number"
            fullWidth
            onChange={this.handleChange('products')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.saveEstimation} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default NewPriceEstimation