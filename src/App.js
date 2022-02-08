import React, { Component } from 'react'
import Login from './views/login'
import Views from './views'
import { isNil } from 'ramda'

class App extends Component {
  state = {}
  setUser = (user) => {
    this.setState({user})
  }
  render () {
    if (isNil(this.state.user)) return <Login onSuccessLogin={this.setUser}/>
    return <Views user={{...this.state.user}}/>
  }
}

export default App
