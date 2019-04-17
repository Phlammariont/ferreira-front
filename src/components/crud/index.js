import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Crud from './crud'

const styles = {
  fab: {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
  }
}

export default withStyles(styles)(Crud)