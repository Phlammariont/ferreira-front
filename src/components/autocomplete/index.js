import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import autoCompleteStyle from './style'
import Autocomplete from './autocomplete'

class AutocompleteContainer extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Autocomplete {...this.props} />
      </div>
    )
  }
}

export default withStyles(autoCompleteStyle)(AutocompleteContainer)