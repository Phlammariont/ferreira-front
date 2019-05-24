import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase from 'firebase/app'
import 'firebase/auth'

const authenticate = callback => (user, password) => {
  firebase.auth().onAuthStateChanged(callback)
  firebase.auth().signInWithEmailAndPassword(user, password).catch(function(error) {
    console.log(error.code)
  })
}

const Login = ({classes, onAuthenticate}) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Paper className={classes.root}>
      <div className={classes.seasonalLogIn}>
        <img className={classes.seasonalImg}
             src="http://www.ferreira.com.co/wp-content/uploads/2016/08/logo_ferreira.jpg" alt=""/>
      </div>
      <div className={classes.logInForm}>
        <form action="/log-in">
          <TextField autoComplete='email' label='Usuario' onChange={evt => setUser(evt.target.value)} fullWidth/>
          <TextField autoComplete='current-password' label='Contraseña' type={'password'} onChange={evt => setPassword(evt.target.value)} fullWidth/>
          <Button variant="contained" className={classes.button} onClick={() => authenticate(onAuthenticate)(user, password)} fullWidth>Entrar</Button>
        </form>
      </div>
    </Paper>
  )
}

const styles = {
  root: {
    width: '50%',
    margin: '10% 25%',
    'background-color': '#fdcc27',
  },
  seasonalLogIn: {
    width: '50%',
    padding: '5vh 25%'
  },
  seasonalImg: {
    width: '100%'
  },
  logInForm: {
    width: '50%',
    padding: '0 25% 15vh'
  },
  button: {
    margin: '1.5rem 0'
  }
}

export default withStyles(styles)(Login)
