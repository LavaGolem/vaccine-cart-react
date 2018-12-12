import React, { Component } from 'react';
import './css/App.css';
import {VaccineList} from './VaccineList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines : [
        {
          id : 0,
          date:new Date(),
          name : 'Vaccine 1',
          additionalInfo: 'Vaccine can make dog sick.',
          repeat: false,
          repeatEveryCount: 0,
          repeatEvery:'month'
        },
        {
          id : 1,
          date: new Date(),
          name : 'Vaccine 2',
          additionalInfo: 'Vaccine can make dog sick.',
          repeat: false,
          repeatEveryCount: 0,
          repeatEvery:'month'
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(newVaccines) {
    this.setState({vaccines: newVaccines})
  }
  render() {
    return <VaccineList onChange={this.handleChange} vaccines={this.state.vaccines}></VaccineList>
  }
}

export default App;
