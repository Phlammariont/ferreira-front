import React, {Component} from 'react'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import {autocompleteFilter, getItemToStringFn} from './filter'
import PropTypes from 'prop-types'

class Autocomplete extends Component{
  static propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    itemField: PropTypes.string.isRequired,
  }
  render () {
    const {label, data, itemField} = this.props
    return (
      <Downshift
        onChange={this.props.onChange}
        itemToString={getItemToStringFn(itemField)}
        selectedItem={this.props.selectedItem}>
          {renderComponents({ label, data, itemField })}
      </Downshift>
    )
  }
}

const renderComponents = ({ label, data, itemField }) => ({ getInputProps, getLabelProps, ...menuProps }) => (
  <div>
    { renderInput({ inputProps: getInputProps(), labelProps: getLabelProps(), label }) }
    { menuProps.isOpen && renderList({ data, itemField, ...menuProps }) }
  </div>
)

const renderList = ({ getMenuProps, ...listProps }) => {
  return (
    <Paper elevation={1}>
      <List {...getMenuProps()} data-testid="autocomplete-list" component="nav">
        {renderItems(listProps)}
      </List>
    </Paper>
  )
}

const renderItems = ({ isOpen, data, inputValue, itemField, ...lineItemProps }) =>
  autocompleteFilter({ data, inputValue, itemField})
    .map(renderLineItem({itemField, ...lineItemProps}))

const renderLineItem = ({ itemField, getItemProps, highlightedIndex, selectedItem }) => (item, index) => (
  <ListItem // TODO @Leon missing: fontWeight: selectedItem === item ? 'bold' : 'normal',
    button
    selected={highlightedIndex === index}
    {...getItemProps({
      key: getItemToStringFn(itemField)(item),
      index,
      item,
    })}
  >
    <ListItemText primary={getItemToStringFn(itemField)(item)} />
  </ListItem>
)

const renderInput = ({inputProps, labelProps, label}) => {
  const { InputProps, ref, ...other } = inputProps;
    return <TextField
      fullWidth={true}
      label={`${label}`}
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}/>
}

export default Autocomplete
