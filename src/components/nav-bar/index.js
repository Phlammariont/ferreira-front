import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {withRouter} from 'react-router-dom'
import {getEmail} from '../../selectors/user'
import authService from '../../service/firebase/auth-service'

const styles = ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left'
  }
})

const NavBar = props => {
  const logOut = async () => {
    await authService.logOut()
    window.location = "http://www.ferreira.com.co";
  }
  const { classes } = props
  return (
    <header  className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Open drawer" onClick={props.openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {getName(props.location)}
          </Typography>
          <Button color="inherit">{getEmail(props.user)}</Button>
          <Button color="inherit" onClick={logOut}>Cerrar la sesión</Button>
        </Toolbar>
      </AppBar>
    </header>
  )
}

const getName = (location) => ({
  '/': 'Home',
  '/price-list': 'Lista de Precios',
  '/price-estimate': 'Cotizaciones',
  '/customer': 'Clientes'
})[location.pathname]

export default withStyles(styles)(withRouter (NavBar))