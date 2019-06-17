import React, {Fragment, useState} from 'react'
import {isNil, map, propEq} from 'ramda'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Multiselect from '../multiselect'
import Autocomplete from '../autocomplete'
import {connect} from 'react-redux'
import {getCollection} from '../../selectors/utils'

const isHide = propEq('isHide', true)

const  ModelForm = ({ model, onClose, onSave }) => {
  const [newModel, setNewModel] = useState({})
  const modelInstance = new model()

  const save = async () => {
    await onSave(newModel)
    onClose()
  }
  return (
    <Fragment>
      <DialogContent>
          <DialogContentText>
              Datos del {modelInstance.label}.
          </DialogContentText>
          {renderFields({ fields: modelInstance.fields, model: newModel, handleChange: setNewModel })}
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose} color="primary">
              Cancel
          </Button>
          <Button onClick={save} color="primary">
              Guardar
          </Button>
      </DialogActions>
    </Fragment>
  )
}

const renderFields = ({fields, model, handleChange}) => {
  const handleFieldChange = name => value => handleChange({ ...model, [name]: value})
  return map( field => {
    if (isHide(field)) return null
    return <ModelField field={field} value={model[field.name]} handleChange={handleFieldChange(field.name)} key={field.name}/>
  }, fields)
}

const ModelField = ({field, handleChange, value}) => {
  if (isNil(field.instanceOf)) return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id={field.name}
        label={field.label}
        type="text"
        fullWidth
        onChange={evt => handleChange(evt.target.value)}
      />
    </div>
  )
  const Field = getModelComponent(field, value)
  return (
    <div>
      <Field
        id={field.name}
        label={field.label}
        onChange={handleChange}
      />
    </div>
  )
}

const getModelComponent = ({ instanceOf:Model }, value) => {
  if ( Model instanceof Array) {
    return connect(state => ({
      data: getCollection(new Model[0]().name)(state),
      itemField: new Model[0]().selectionField || 'name',
      selection: value
    }))(Multiselect)
  }
  return connect(state => ({
    data: getCollection(new Model().name)(state),
    itemField: new Model().selectionField || 'name',
    selectedItem: value
  }))(Autocomplete)
}

export default ModelForm