import React from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withRouter } from 'react-router-dom'
import { getEmail } from '../../selectors/user'
import authService from '../../service/firebase/auth-service'

const NavbarTypografy = styled(Typography)`
    flex-grow: 1
    text-align: left
`

const NavBar = props => {
  const logOut = async () => {
    await authService.logOut()
    window.location = "http://www.ferreira.com.co";
  }
  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.openDrawer} >
            <MenuIcon />
          </IconButton>
          <NavbarTypografy variant="h6" color="inherit">
            {getName(props.location)}
          </NavbarTypografy>
          <Button color="inherit">
            <NavbarTypografy>
              {getEmail(props.user)}
            </NavbarTypografy>
          </Button>
          <Button color="inherit" onClick={logOut}>
            <NavbarTypografy>
              Cerrar la sesión
            </NavbarTypografy>
          </Button>
        </Toolbar>
      </AppBar>
  )
}

const getName = (location) => ({
  '/': 'Home',
  '/price-list': 'Lista de Precios',
  '/price-estimate': 'Cotizaciones',
  '/customer': 'Clientes'
})[location.pathname]

export default withRouter(NavBar)
