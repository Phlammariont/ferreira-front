import React, {Component} from 'react'
import Autocomplete from '../autocomplete/autocomplete'
import {isEmpty, without, map} from 'ramda'
import {getItemToStringFn} from '../autocomplete/filter'

class Multiselect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: props.selection || [],
      options: this.props.data
    }
  }

  onSelection = (option) => {
    this.props.onChange([...this.state.selection, option])
    this.setState({
      selection: [...this.state.selection, option],
      options: without([option], this.state.options)
    })
  }

  deleteOption = (option) => () => {
    this.setState({
      selection: without([option], this.state.selection),
      options: [...this.state.options, option],
    })
  }

  aggregateOptions = () => {
    const aggregation = map(option => ({
      ...option,
      name: getItemToStringFn(this.props.itemField)(option),
      onDelete: this.deleteOption(option)
    }))
    return aggregation(this.state.selection)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <SelectedOptions options={this.aggregateOptions()}/>
        <Autocomplete
          label={this.props.label}
          data={this.state.options}
          itemField={this.props.itemField}
          onChange={this.onSelection}
          fullWidth={this.props.fullWidth}
          selectedItem={null}
        />
      </div>
    )
  }
}

const SelectedOptions = ({options}) => {
  if (isEmpty(options)) return null
  return (
    <ul data-testid="selected-options">
      {map(RenderOption, options)}
    </ul>
  )
}

const RenderOption = ({name, onDelete}) => <li key={name}><span>{name}</span> <span onClick={onDelete}>X</span></li>

export default Multiselect