import React, { Component } from 'react'
import Login from './views/login'
import Views from './views'
import {isNil} from 'ramda'

class App extends Component {
  state = {}
  setUser = (user) => {
    this.setState({user})
  }
  render () {
    return isNil(this.state.user) ? <Login onSuccessLogin={this.setUser}/> : <Views user={{...this.state.user}}/>
  }
}

export default App