import {filter, pathOr, take, toLower} from 'ramda'

export const getItemToStringFn = itemField => pathOr('', itemField.split('.'))
const optionByValue = ({inputValue, itemField}) => item => !inputValue || toLower(getItemToStringFn(itemField)(item)).includes(toLower(inputValue).toLowerCase())

export const autocompleteFilter = ({data, inputValue, itemField, maxOptions = 5}) => {
  return take(maxOptions, filter(optionByValue({inputValue, itemField}), data))
}
