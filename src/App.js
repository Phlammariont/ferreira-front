import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav-bar'
import PriceList from './views/price-list'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar pageName={'Lista de Precios'}/>
        <PriceList />
      </div>
    );
  }
}

export default App;
