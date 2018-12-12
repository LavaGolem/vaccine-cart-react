import React, {Component} from 'react';
import '../css/VaccineList.css'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export class VaccineRow extends Component {

    markAsDone = () =>
    {
      this.props.markAsDone(this.props.vaccine)
    }
    editVaccine = () =>
    {
      this.props.editVaccine(this.props.vaccine)
    }

    render() {
        return (
            <TableRow className="VaccineList_tr">
                <TableCell >{this.props.vaccine.name}</TableCell>
                <TableCell >{this.props.vaccine.date.toLocaleString()}</TableCell>
                <TableCell >{this.props.vaccine.additionalInfo}</TableCell>
                <TableCell >
                    {this.props.vaccine.done ?
                        <div>Done</div> :
                      <div>
                        <Button variant="outlined" onClick={this.markAsDone}> Done</Button>
                        <Button variant="outlined" onClick={this.editVaccine}> Edit</Button>
                      </div>
                    }
                </TableCell>
            </TableRow>
        )
    }
}
