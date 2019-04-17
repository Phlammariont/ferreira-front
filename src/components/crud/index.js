import React, {Component} from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {map, reduce, values, evolve, isNil} from 'ramda'
import Table from '@material-ui/core/Table'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

class Crud extends Component {
  static propTypes = {
    newModelForm: PropTypes.func.isRequired,
    model: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired
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
    const model = new this.props.model()
    return (
      <div>
        <Table>
          {renderTableHeader({fields: model.fields})}
          <TableBody>
            {this.props.collection && map(Row(model.fields), this.props.collection)}
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
          <DialogTitle>Agregar {model.name}</DialogTitle>
          <NewModelForm onClose={this.handleClose}/>
        </Dialog>
      </div>
    )
  }
}

const renderTableHeader = ({fields}) => (
  <TableHead>
    <TableRow>
      {map(TableCellHeader, fields)}
    </TableRow>
  </TableHead>
)

const TableCellHeader = ({label, isHide}) => isHide ? null : <TableCell key={label}>{label}</TableCell>

const Row = fields => item => (
  <TableRow key={item.id}>
    {values(evolve(CellRenderReducer(fields), item))}
  </TableRow>
)

const CellRenderReducer = reduce((Renders, field) => {
  return {
    ...Renders,
    [field.name]: Cell(field)
  }
}, {})

const renderModel = ({Model, value }) => {
  if ( Model instanceof Array) {
    return map(item => <span key={item.id}>{new Model[0](item).toString()}</span>, value)
  }
  return new Model(value).toString()
}

const Cell = field => value => {
  if (field.isHide) return null
  return (
    <TableCell key={value.id || value}>
      {isNil(field.instanceOf) ? value : renderModel({ Model: field.instanceOf, value })}
    </TableCell>
  )
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
  }
}

export default withStyles(styles)(Crud)