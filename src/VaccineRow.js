import React, { Component } from 'react';
import './css/VaccineList.css'
import {CompleteEvent} from './CompleteEvent'

export class VaccineRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine : this.props.vaccine
    }
    this.completeVaccine = this.completeVaccine.bind(this)
  }

  completeVaccine() {
    const vaccine = this.state.vaccine
    vaccine.done = true
    this.props.onChange(this.state.vaccine)
  }

  render() {
    return(
      <tr className="VaccineList_tr">
        <td className="VaccineList_td">{this.state.vaccine.name}</td>
        <td className="VaccineList_td">{this.state.vaccine.date.toLocaleString()}</td>
        <td className="VaccineList_td">{this.state.vaccine.additionalInfo}</td>
        <td className="VaccineList_td">
          {this.state.vaccine.done ?
            <div>Done</div> :
            <CompleteEvent id={this.state.vaccine.id} onClick={this.completeVaccine}></CompleteEvent>
          }
        </td>
      </tr>
    )
  }
}
