import React, {Component} from 'react'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import { propOr } from 'ramda'

class Autocomplete extends Component{
  render () {
    const {label, data, itemField} = this.props
    return (
      <Downshift
        onChange={selection => alert(`You selected ${propOr('', itemField)(selection)}`)}
        itemToString={propOr('', itemField)}
      >
        {renderComponents({ label, data, itemField })}
      </Downshift>
    )
  }
}

const renderComponents = ({ label, data, itemField }) => ({
  getInputProps,
  getItemProps,
  getLabelProps,
  getMenuProps,
  isOpen,
  inputValue,
  highlightedIndex,
  selectedItem,
}) => (
  <div>
    {renderInput({ inputProps: getInputProps(), labelProps: getLabelProps(), label })}
    {renderList({
      isOpen,
      inputValue,
      data,
      itemField,
      getItemProps,
      getMenuProps,
      highlightedIndex,
      selectedItem,
    })}
  </div>
)

const renderList = ({
  getMenuProps,
  ...listProps
}) => {
  return (
    <ul {...getMenuProps()} data-testid="autocomplete-list" >
      {renderItems(listProps)}
    </ul>
  )
}

const renderItems = ({
  isOpen,
  inputValue,
  data,
  itemField,
  getItemProps,
  highlightedIndex,
  selectedItem
}) => {
  if (!isOpen) return null

  return data
      .filter(item => !inputValue || propOr('', itemField, item).includes(inputValue))
      .map((item, index) => (
        <li
          {...getItemProps({
            key: propOr('', itemField, item),
            index,
            item,
            style: {
              backgroundColor:
                highlightedIndex === index ? 'lightgray' : 'white',
              fontWeight: selectedItem === item ? 'bold' : 'normal',
            },
          })}
        >
          {propOr('', itemField, item)}
        </li>
      ))
}

const renderInput = ({inputProps, labelProps, label}) => {
  const { InputProps, ref, ...other } = inputProps;
    return <TextField
      label={`${label}`}
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}/>
}

export default Autocomplete
