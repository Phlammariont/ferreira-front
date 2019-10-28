import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import NemModel from './model-form'
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
        <CrudTable {...this.props} model={model} />
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
    const NewModelForm = this.props.newModelForm || NemModel
    return (
      <React.Fragment>
        <NewModelButton className={this.props.classes.fab} onClick={this.openNewModel}/>
        <Dialog
          open={this.state.newModelFormOpen}
          onClose={this.handleClose}
          maxWidth='md'
          fullWidth={true}
          aria-labelledby="form-dialog-title" >
          <DialogTitle>Agregar {this.state.model.label}</DialogTitle>
          <NewModelForm
            onClose={this.handleClose}
            model={this.props.model}
            onSave={this.props.onSave} />
        </Dialog>
      </React.Fragment>
    )
  }
}

const NewModelButton = ({ className, onClick }) => (
  <Fab
    data-testid="new-model-fab"
    color="primary"
    aria-label="Add"
    className={className}
    onClick={onClick} >
    <AddIcon>add</AddIcon>
  </Fab>
)

export default Crud