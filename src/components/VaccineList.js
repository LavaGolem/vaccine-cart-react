import React, {Component} from 'react';
import '../css/VaccineList.css'
import {VaccineTable} from './VaccineTable'
import Button from '@material-ui/core/Button';
import {SimpleModal} from "./SimpleModal";
import SimpleModalWrapped from "./SimpleModal";

export class VaccineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: null,
      openEdit: false
    }
  }

  markAsDone = (vaccine) => {
    this.props.markAsDone(vaccine)
  }

  addVaccine = (vaccine) => {
    this.props.addVaccine(vaccine)
    this.setState({vaccine:null , openEdit: false})
  }

  editVaccine = (vaccine) => {
    this.setState({vaccine: vaccine, openEdit: true})
  }

  render() {
    return (
      <div>
        <VaccineTable onChange={this.handleChange} markAsDone={this.markAsDone}
                      vaccines={this.props.vaccines} editVaccine={this.editVaccine}/>
        <br/><br/>
        <SimpleModalWrapped vaccine={this.state.vaccine} addVaccine={this.addVaccine} open={this.state.openEdit}/>
      </div>
    )
  }
}
