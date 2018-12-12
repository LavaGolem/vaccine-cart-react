import React, { Component } from 'react';
import './css/VaccineList.css'
import {VaccineRow} from './VaccineRow'

export class VaccineTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines : this.props.vaccines
    }
    this.completeVaccine = this.completeVaccine.bind(this)
  }

  completeVaccine(vaccine){
    const newList = this.state.vaccines.slice()
    newList[newList.indexOf(vaccine)] = vaccine
    this.props.onChange(newList)
  }

  render() {
    return(
      <table className="VaccineList_table">
        <tbody>
          <tr>
            <th className="VaccineList_th">Vaccine Name</th>
            <th className="VaccineList_th">Date</th>
            <th className="VaccineList_th">Additional Info</th>
            <th className="VaccineList_th">Action</th>
          </tr>
          {this.state.vaccines.map(x =>
            <VaccineRow onChange={this.completeVaccine} vaccine={x}></VaccineRow>)
          }
        </tbody>
      </table>
    )
  }
}
