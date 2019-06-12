import React, { Component } from 'react'
import Login from './views/login'
import Views from './views'
import {isNil} from 'ramda'
import authService from './service/firebase/auth-service'

class App extends Component {
  state = {}
  componentDidMount() {
    authService.init({onAuthenticate: this.setUser})
  }
  setUser = (user) => {
    this.setState({user})
  }
  render () {
    return isNil(this.state.user) ? <Login /> : <Views user={{...this.state.user}}/>
  }
}

export default App