import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core'
import styles from './styles'
import authService from '../../service/firebase/auth-service'

const Login = ({classes, onAuthenticate}) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = () => authService.authenticate({onAuthenticate, user, password})

  return (
    <Paper className={classes.root}>
      <div className={classes.seasonalLogIn}>
        <img className={classes.seasonalImg}
             src="http://www.ferreira.com.co/wp-content/uploads/2016/08/logo_ferreira.jpg" alt=""/>
      </div>
      <div className={classes.logInForm}>
        <form action="/log-in">
          <Button variant="contained" className={classes.button} onClick={() => {window.location = 'https://www.zoho.com/mail/login.html'}} fullWidth>Correo Electronico</Button>
          <TextField id={'txt-user'} autoComplete='email' label='Usuario' onChange={evt => setUser(evt.target.value)} fullWidth/>
          <TextField id={'txt-password'} autoComplete='current-password' label='Contraseña' type={'password'} onChange={evt => setPassword(evt.target.value)} fullWidth/>
          <Button variant="contained" className={classes.button} onClick={authenticate} fullWidth>Entrar</Button>
        </form>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(Login)