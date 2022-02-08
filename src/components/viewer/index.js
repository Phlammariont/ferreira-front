import React from 'react'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
  root: {
    width: '45%',
    display: 'inline-block',
    margin: '1rem',
    padding: '1rem',
  },
}));

const Viewer = ({ display, children }) => {
  if (!display) return null
  const classes = useStyles()
  return <Paper className={classes.root}>{children}</Paper>
}

export default Viewer
