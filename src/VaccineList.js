import React, { Component } from 'react';
import './css/VaccineList.css'
import {AddVaccine} from './AddVaccine'
import {VaccineTable} from './VaccineTable'

export class VaccineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines : this.props.vaccines,
      showAddForm : false
    }
    this.handleChange = this.handleChange.bind(this)
    this.toogleShowAddForm = this.toogleShowAddForm.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  toogleShowAddForm() {
    let value = ! this.state.showAddForm
    this.setState(
      { showAddForm: value }
    );
  }
  onChange(vaccine) {
    const vaccines = this.state.vaccines
    vaccine.id = vaccines.length - 1
    vaccines.push(vaccine)
    this.props.onChange(vaccines)
  }

  handleChange(vaccines) {
    this.props.onChange(vaccines)
  }

  render() {
    return(
      <div>
        <VaccineTable onChange={this.handleChange} vaccines={this.state.vaccines}></VaccineTable>
        <button onClick={this.toogleShowAddForm}>Add new record</button>
        {this.state.showAddForm && <AddVaccine onChange={this.onChange}/>}
      </div>
    )
  }
}
