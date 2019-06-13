import React, {Fragment, useState} from 'react'
import { map } from 'ramda'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Multiselect from '../multiselect'
import Autocomplete from '../autocomplete'
import {connect} from 'react-redux'
import {getCollection} from '../../selectors/utils'

const renderFields = ({fields, model, handleChange}) => {
  const handleFieldChange = name => value => handleChange({ ...model, [name]: value})
  return map( field => {
    return <ModelField field={field} handleChange={handleFieldChange(field.name)} key={field.name}/>
  }, fields)
}

const  ModelForm = ({ model, onClose }) => {
  const [newModel, setNewModel] = useState({})
  const modelInstance = new model()
  
  const save = () => {
    console.log('saving my model', newModel)
  }
  return (
    <Fragment>
      <DialogContent>
          <DialogContentText>
              Datos del {modelInstance.label}.
          </DialogContentText>
          {renderFields({ fields: modelInstance.fields, model: modelInstance, handleChange: setNewModel })}
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

const ModelField = ({field, handleChange}) => {
  const Field = field.instanceOf ? getModelComponent(field) : TextField
  return (
    <Field
      autoFocus
      margin="dense"
      id={field.name}
      label={field.label}
      type="text"
      fullWidth
      onChange={handleChange}
    />
  )
}

const getModelComponent = ({ instanceOf:Model }) => {
  if ( Model instanceof Array) {
    return connect(state => ({ data: getCollection(new Model[0]().name)(state) }))(Multiselect)
  }
  return connect(state => ({ data: getCollection(new Model().name)(state) }))(Autocomplete)
}

export default ModelForm