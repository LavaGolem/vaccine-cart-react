import React, {Component} from 'react';
import '../css/App.css';
import {VaccineList} from './VaccineList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccines: [
        {
          id: 0,
          date: new Date(),
          name: 'Vaccine 1',
          additionalInfo: 'Vaccine can make dog sick.',
          repeat: true,
          repeatEveryCount: 3,
          repeatTimes: 4,
          repeatEvery: 'day',
        },
        {
          id: 1,
          date: new Date(),
          name: 'Vaccine 2',
          additionalInfo: 'Vaccine can make dog sick.',
          repeat: false,
          repeatEveryCount: 4,
          repeatTimes: 3,
          repeatEvery: 'month',
        }
      ]
    }
  }

  markAsDone = (vaccine) => {
    const vaccines = this.state.vaccines.slice()
    vaccines[vaccines.indexOf(vaccine)].done = true
    this.setState({vaccines: vaccines})
  };

  addVaccine = (vaccine) => {
    const vaccines = this.state.vaccines.slice();
    if(vaccine.id !== -1) {
      let index = this.state.vaccines.findIndex(x => x.id === vaccine.id);;
      vaccines[index] = vaccine;
    } else {
      vaccine.id = vaccines.length;
      vaccines.push(vaccine);
    }
    this.setState({vaccines : vaccines})
  }

  render() {
    return <VaccineList markAsDone={this.markAsDone} addVaccine={this.addVaccine} vaccines={this.state.vaccines}/>
  }
}

export default App;
