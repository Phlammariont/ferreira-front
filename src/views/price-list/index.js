import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import priceService from '../../service/price-service'

const styles = {
  fab: {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
  }
}

class PriceList extends Component{
  constructor (props) {
    super(props)
    this.state = {
      newPriceFormOpen: false,
      newPrice: {}
    }
  }

  openNewPrice = () => (
    this.setState({newPriceFormOpen: true})
  )

  handleClose = () => {
    this.setState({newPriceFormOpen: false})
  }

  savePrice = () => {
    priceService.save(this.state.newPrice)
  }

  handleChange = (field) => ( evt ) => {
    this.setState({
      newPrice: {
        ...this.state.newPrice,
        [field]: evt.target.value
      }
    })
  }

  render () {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cama Doble</TableCell>
              <TableCell>1000000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Fab
          color="primary"
          aria-label="Add"
          className={this.props.classes.fab}
          onClick={this.openNewPrice} >
          <AddIcon />
        </Fab>

        <Dialog
          open={this.state.newPriceFormOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
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
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.savePrice} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PriceList)