import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NewCustomerForm from '../customer/NewCustomerForm'

class NewCreditForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayClientForm: false
		}
	}

	displayClientForm = () => {
		this.setState({displayClientForm: true})
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

	render() {
		return (
			<main>
				<h1>Nuevo Crédito</h1>
				<div>
					<Button variant="contained" >Buscar Cliente</Button>
					<Button variant="contained" onClick={this.displayClientForm}>Nuevo Cliente</Button>
						{this.renderCustomerForm()}
					<Button variant="contained" >Buscar Codeudor</Button>
					<Button variant="contained" >Nuevo Codeudor</Button>
					<Button variant="contained" >Nuevo Negócio</Button>
					<Button variant="contained" >Nuevo Crédito</Button>
				</div>
			</main>
		)
	}
}

export default NewCreditForm