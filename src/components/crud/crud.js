import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/core/SvgIcon/SvgIcon'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import CrudTable from './table'

class Crud extends Component {
  static propTypes = {
    newModelForm: PropTypes.func.isRequired,
    model: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired
  }

  render () {
    const model = new this.props.model()
    return (
      <div>
        <CrudTable model={model} collection={this.props.collection}/>
        <NewModel {...this.props} />
      </div>
    )
  }
}

class NewModel extends Component {
  constructor (props) {
    super (props)
    this.state = {
      newModelFormOpen: false,
      model: new this.props.model()
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
      <React.Fragment>
        <NewModelButton className={this.props.classes.fab} onClick={this.openNewModel}/>
        <Dialog
          open={this.state.newModelFormOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title" >
          <DialogTitle>Agregar {this.state.model.name}</DialogTitle>
          <NewModelForm onClose={this.handleClose}/>
        </Dialog>
      </React.Fragment>
    )
  }
}

const NewModelButton = ({ className, onClick }) => (
  <Fab
    color="primary"
    aria-label="Add"
    className={className}
    onClick={onClick} >
    <AddIcon />
  </Fab>
)

export default Crud