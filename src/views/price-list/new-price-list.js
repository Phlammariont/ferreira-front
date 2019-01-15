import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import React, {Component} from 'react'
import priceService from '../../service/price-service'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

class NewPriceForm extends Component{
  constructor (props) {
    super(props)
    this.state = {
      newPrice: {}
    }
  }

  handleChange = (field) => ( evt ) => {
    this.setState({
      newPrice: {
        ...this.state.newPrice,
        [field]: evt.target.value
      }
    })
  }

  savePrice = () => {
    priceService.save(this.state.newPrice)
    this.setState({newPrice: {}})
    this.props.onClose()
  }

  render () {
    return (
      <div>
        <DialogContent>
          <DialogContentText>
            Nombre del producto y valor.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="email"
            fullWidth
            onChange={this.handleChange('name')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Precio"
            type="number"
            fullWidth
            onChange={this.handleChange('price')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.savePrice} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default NewPriceForm