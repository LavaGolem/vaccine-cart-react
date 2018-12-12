import React, {Component} from 'react';
import '../css/VaccineList.css'
import DatePicker from "react-datepicker";
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';


import "react-datepicker/dist/react-datepicker.css";


export class AddVaccine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: {
        id: -1,
        date: new Date(),
        name: '',
        additionalInfo: '',
        repeat: false,
        repeatEveryCount: 0,
        repeatEvery: 'month'
      }
    };
    if (this.props.vaccine != null) {
      this.state.vaccine = this.props.vaccine
    }
  }

  handleChangeDate = (date) => {
    const vaccine = this.state.vaccine;
    vaccine.date = date
    this.setState({vaccine: vaccine});
  }

  handleChangeName = event => {
    const vaccine = {...this.state.vaccine, additionalInfo: event.target.value};
    this.setState({vaccine});
  }

  handleChangeRepeat = event => {
    const vaccine = {...this.state.vaccine, repeat: event.target.checked};
    this.setState({vaccine: vaccine});
  }

  handleChangeRepeatEvery = event => {
    alert("Tu sam")
    console.log("Repeat every")
    console.log(event.target.value)
    const vaccine = {...this.state.vaccine, repeatEvery: event.target.value};
    this.setState({vaccine: vaccine})
  }

  handleChangeAdditionalInfo = event => {
    const vaccine = {...this.state.vaccine, additionalInfo: event.target.value};
    this.setState({vaccine});
  }

  addVaccine = (e) => {
    e.preventDefault()
    this.props.addVaccine(this.state.vaccine)
  }

  render() {
    return (
      <form onSubmit={this.addVaccine} action="">
        <FormLabel>
          Name:
          <Input value={this.state.vaccine.name} onChange={this.handleChangeName} type="text" name="name"/>
        </FormLabel>
        <br/><br/>
        <FormLabel>
          Date:
          <DatePicker
            selected={this.state.vaccine.date}
            onChange={this.handleChangeDate}
          />
        </FormLabel>
        <br/><br/>
        <InputLabel>
          Additional info:
          <Input multiline={true} value={this.state.vaccine.additionalInfo} onChange={this.handleChangeAdditionalInfo}/>
        </InputLabel>
        <br/><br/>
        <FormLabel>
          Repeat:
          <Checkbox
            name="repeat"
            checked={this.state.vaccine.repeat}
            onChange={this.handleChangeRepeat}
            color="primary"
          />
        </FormLabel>
        <FormLabel>
          Every:
          <Select value={this.state.vaccine.repeatEvery} onChange={this.handleChangeRepeatEvery}>
            <option value="year">Years</option>
            <option value="month">Months</option>
            <option value="day">Days</option>
          </Select>
        </FormLabel>
        <br/><br/>
        <Button variant={"outlined"} type="submit" value="Submit">Submit</Button>
      </form>
    )
  }
}
