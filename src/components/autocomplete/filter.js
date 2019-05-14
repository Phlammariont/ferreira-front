import { propOr, filter, toLower } from 'ramda'

const optionByValue = ({inputValue, itemField}) => item => !inputValue || toLower(propOr('', itemField, item)).includes(toLower(inputValue).toLowerCase())

export const autocompleteFilter = ({data, inputValue, itemField}) => filter(optionByValue({ inputValue, itemField }), data)
