import React, {Component} from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {map, mapObjIndexed, values} from 'ramda'
import Table from '@material-ui/core/Table'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

class Crud extends Component {
  static propTypes = {
    newModelForm: PropTypes.func.isRequired
  }

  constructor (props) {
    super (props)
    this.state = {
      newModelFormOpen: false,
      newModel: {}
    }
  }

  handleClose = () => {
    this.setState({newModelFormOpen: false})
  }

  openNewModel = () => (
    this.setState({newModelFormOpen: true})
  )

  render () {
    const NewModelForm = this.props.newModelForm
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {map(TableCellHeader, this.props.model.fields)}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.collection && map(Row, this.props.collection)}
          </TableBody>
        </Table>
        <Fab
          color="primary"
          aria-label="Add"
          className={this.props.classes.fab}
          onClick={this.openNewModel} >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.newModelFormOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title" >
          <DialogTitle>Agregar {this.props.model.name}</DialogTitle>
          <NewModelForm onClose={this.handleClose}/>
        </Dialog>
      </div>
    )
  }
}

const TableCellHeader = ({label}) => <TableCell key={label}>{label}</TableCell>

const Row = item => <TableRow key={item.name + item.price}>{values(mapObjIndexed(Cell, item))}</TableRow>

const Cell = field => <TableCell key={field}>{field}</TableCell>

const styles = {
  fab: {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
  }
}

export default withStyles(styles)(Crud)