import React, {useState} from 'react'
import { pipe } from 'ramda'
import {withStyles} from '@material-ui/core'
import styles from './styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import { getValue } from '../../utils/ramda'
import authService from '../../service/firebase/auth-service'

const ChangePassword = ({classes, onChange}) => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const changePassword = async () => {
    if (password !== repeatPassword) return setShowError(true)
    const user = await authService.resetPassword(repeatPassword)
    return onChange(user)
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.seasonalLogIn}>
        <img className={classes.seasonalImg}
             src="http://www.ferreira.com.co/wp-content/uploads/2016/08/logo_ferreira.jpg" alt=""/>
      </div>
      <div className={classes.logInForm}>
        <form action="/reset-password">
          <TextField type={'password'} label='Nueva Contraseña' onChange={pipe(getValue, setPassword)} fullWidth/>
          <TextField label='Nueva Contraseña' type={'password'} onChange={pipe(getValue, setRepeatPassword)} fullWidth/>
          {showError && <span>Las contraseñas deben ser iguales</span>}
          <Button variant="contained" className={classes.button} onClick={changePassword} fullWidth>
            Cambiar Contraseña
          </Button>
        </form>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(ChangePassword)
