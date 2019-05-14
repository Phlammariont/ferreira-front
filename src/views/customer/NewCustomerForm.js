import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import React, {Component} from 'react'
import customerService from '../../service/customer'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

class NewCustomerForm extends Component{
  constructor (props) {
    super(props)
    this.state = {
      newCustomer: {}
    }
  }

  handleChange = (field) => ( evt ) => {
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        [field]: evt.target.value
      }
    })
  }

  saveCustomer = () => {
    customerService.save(this.state.newCustomer)
    this.setState({newCustomer: {}})
    this.props.onClose()
  }

  render () {
    return (
      <div>
        <DialogContent>
          <DialogContentText>
            Datos del Cliente.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            onChange={this.handleChange('name')}
          />
          <TextField
            margin="dense"
            id="mail"
            label="E-Mail"
            type="mail"
            fullWidth
            onChange={this.handleChange('email')}
          />
          <TextField
            margin="dense"
            id="legal-id"
            label="Cedula"
            type="text"
            fullWidth
            onChange={this.handleChange('legalId')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.saveCustomer} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default NewCustomerForm