import React, {PureComponent} from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch} from "react-router-dom"
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


export const appStore  = store({})

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
      <Provider store={appStore}>
        <BrowserRouter>
          <div className="App">
            <NavBar openDrawer={this.toggleDrawer(true)} user={this.props.user} />
            <Drawer open={this.state.drawerOpen} closeDrawer={this.toggleDrawer(false)}/>
            <Routes />
          </div>
        </BrowserRouter>
      </Provider>
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

const Home = () => <h1>Hola Usuario</h1>

export default App;
