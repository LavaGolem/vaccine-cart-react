import React, {Component} from 'react';
import '../css/VaccineList.css'
import {VaccineRow} from './VaccineRow'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class VaccineTable extends Component {

  markAsDone = (vaccine) => {
    this.props.markAsDone(vaccine)
  }
  editVaccine = (vaccine) => {
    this.props.editVaccine(vaccine)
  }

  render() {
    return (
      <Table className="VaccineList_table">
        <TableHead>
          <TableRow>
            <TableCell>Vaccine Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Additional Info</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.vaccines.map(vaccine =>
            <VaccineRow markAsDone={this.markAsDone} editVaccine={this.editVaccine} vaccine={vaccine}></VaccineRow>)
          }
        </TableBody>
      </Table>
    )
  }
}
