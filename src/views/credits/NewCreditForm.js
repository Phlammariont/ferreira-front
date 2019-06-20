import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NewCustomerForm from '../customer/NewCustomerForm'
import TextField from '@material-ui/core/TextField'


class NewCreditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayClientForm: false
    }
  }

  displayClientForm = () => {
    this.setState({ displayClientForm: true })
  }

  renderCustomerForm = () => {
    if (this.state.displayClientForm)
      return (
        <div>
          <NewCustomerForm />
        </div>
      )
    return null
  }

  displayGuarantorForm = () => {
    this.setState({ displayGuarantorForm: true })
  }

  renderGuarantorForm = ({ isGuarantor }) => {
    if (this.state.displayGuarantorForm)
      return (
        <div>
          <NewCustomerForm isGuarantor={isGuarantor} />
        </div>
      )
    return null
  }



  render() {
    return (
      <main>
        <h1>Nuevo Crédito</h1>
        <div>
          <Button variant="contained" >Buscar Cliente</Button>
          <Button variant="contained" onClick={this.displayClientForm}>Nuevo Cliente</Button>
          {this.renderCustomerForm()}
          <Button variant="contained" >Buscar Codeudor</Button>
          <Button variant="contained" onClick={this.displayGuarantorForm}>Nuevo Codeudor</Button>
          {this.renderGuarantorForm({ isGuarantor: true })}
          <Button variant="contained" >Nuevo Negócio</Button>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Cantidad"
            type="text"
            fullWidth
            onChange={this.handleChange('quantity')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="reference"
            label="Referéncia"
            type="text"
            fullWidth
            onChange={this.handleChange('reference')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Valor"
            type="text"
            fullWidth
            onChange={this.handleChange('price')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fabric"
            label="Tela"
            type="text"
            fullWidth
            onChange={this.handleChange('fabric')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            onChange={this.handleChange('color')}
          />
          <Button variant="contained" >Nuevo Crédito</Button>
        </div>
      </main>
    )
  }
}

export default NewCreditForm