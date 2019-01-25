import React, {Component} from 'react'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

class Autocomplete extends Component{
  render () {
    return (
      <Downshift
        onChange={selection => alert(`You selected ${selection.value}`)}
        itemToString={item => (item ? item.value : '')}
      >
        {({
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
            {renderInput(getInputProps(), getLabelProps())}
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                  .filter(item => !inputValue || item.value.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    )
  }
}

const renderInput = (inputProps, labelProps) => {
  const { InputProps, ref, ...other } = inputProps;
  return <TextField
    InputProps={{
      inputRef: ref,
      ...InputProps
    }}
    {...other}/>
}

export default Autocomplete
