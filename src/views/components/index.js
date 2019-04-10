import React, {Component} from 'react'
import Autocomplete from '../../components/autocomplete'

class Index extends Component {
  render() {
    return (
      <div>
        <h1>hola mundo components</h1>
        <div>
          <Autocomplete label={'Mi Autocomplete'} data={[{name: 'leon'}, {name: 'Alejandra'}]} itemField={'name'}/>
        </div>
      </div>
    )
  }
}

export default Index