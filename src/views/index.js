import React, {PureComponent} from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from '../redux'
import '../App.css'
import NavBar from '../components/nav-bar'
import Drawer from '../components/drawer'
import PriceList from '../views/price-list'
import PriceEstimate from '../views/price-estimate'
import Customer from '../views/customer'
import ComponentIndex from '../views/components'
import Purchase from './purchase'
import Credits from './credits'
import Inventory from './inventory'
import NewCreditForm from './credits/NewCreditForm';
import { Home } from './home'


export const appStore  = store({})

const theme = createMuiTheme({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  backgroundGrey: '#414141',
  palette: {
    primary: {
      main: '#FDCC27'
    },
    secondary: {
      main: '#202020',
    },
  },
});

class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawer = (open) => () => this.setState({drawerOpen: open})

  render() {
    return (
    <ThemeProvider theme={theme} >
      <Provider store={appStore}>
        <BrowserRouter>
          <div className="App">
            <NavBar openDrawer={this.toggleDrawer(true)} user={this.props.user} />
            <Drawer open={this.state.drawerOpen} closeDrawer={this.toggleDrawer(false)}/>
            <Routes />
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
    )
  }
}

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/price-list" component={PriceList} />
    <Route path="/price-estimate" component={PriceEstimate} />
    <Route path="/customer" component={Customer} />
    <Route path="/purchase" component={Purchase} />
    <Route exact path="/credits" component={Credits} />
    <Route exact path="/credits/new" component={NewCreditForm} />
    <Route path="/inventory" component={Inventory} />
    <Route path="/super-component-index" component={ComponentIndex} />
  </Switch>
)

export default App;
