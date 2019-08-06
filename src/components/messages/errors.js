import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

export const showError = (message) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
     open>
      <SnackbarContent
        aria-describedby="client-snackbar"
        message={<span id="client-snackbar">{message}</span>}
      />
    </Snackbar>
  )
}