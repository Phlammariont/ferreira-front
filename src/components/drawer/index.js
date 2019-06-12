import React, {Component} from 'react'
import Drawer from '@material-ui/core/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './style'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import {Link} from 'react-router-dom'


class AppDrawer extends Component{
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render () {
    const { classes, theme } = this.props
    return (
      <Drawer
        open={this.props.open}
        onClose={this.props.closeDrawer} >
        <div className={classes.toolbar}>
          <IconButton onClick={this.props.closeDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><MailIcon/></ListItemIcon>
            <Link to="/price-estimate">Cotizaciones</Link>
          </ListItem>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><MailIcon/></ListItemIcon>
            <Link to="/price-list">Lista de Precios</Link>
          </ListItem>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><MailIcon/></ListItemIcon>
            <Link to="/customer">Clientes</Link>
          </ListItem>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><MailIcon/></ListItemIcon>
            <Link to="/purchase">Negocios</Link>
          </ListItem>
          <ListItem button onClick={this.props.closeDrawer}>
            <ListItemIcon><MailIcon/></ListItemIcon>
            <Link to="/credits">Cartera</Link>
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AppDrawer)
