import React, {Component} from 'react'
import Autocomplete from '../../components/autocomplete'
import Multiselect from '../../components/multiselect'

class Index extends Component {
  render() {
    return (
      <div>
        <h1>hola mundo components</h1>
        <div>
          <Autocomplete label={'Mi Autocomplete'} data={[{name: 'leon'}, {name: 'Alejandra'}]} itemField={'name'}/>
        </div>
        <div>
          <Multiselect
            label={'Mi Multiselect'} 
            data={
              [{name: 'Leon'}, {name: 'Alejandra'}]
            } 
            itemField={'name'} 
            onChange={options => console.log(options)}/>
        </div>
      </div>
    )
  }
}

export default Index