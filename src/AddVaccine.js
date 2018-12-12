import React, {Component} from 'react';
import './css/VaccineList.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export class AddVaccine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: -1,
            date: new Date(),
            name: '',
            additionalInfo: '',
            repeat: false,
            repeatEveryCount: 0,
            repeatEvery: 'month'
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAdditionalInfo = this.handleChangeAdditionalInfo.bind(this);
        this.handleChangeRepeat = this.handleChangeRepeat.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeDate(date) {
        this.setState({date: date});
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeRepeat(event) {
        this.setState({repeat: event.target.checked});
    }

    handleChangeAdditionalInfo(event) {
        this.setState({additionalInfo: event.target.value});
    }

    handleSubmit() {
        this.props.onChange(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input value={this.state.name} onChange={this.handleChangeName} type="text" name="name"/>
                </label>
                <br/>

                <label>
                    Date:
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                    />
                </label>
                <br/>

                <label>
                    Additional info:
                    <textarea value={this.state.additionalInfo} onChange={this.handleChangeAdditionalInfo}/>
                </label>
                <br/>

                <label>
                    Repeat:
                    <input
                        name="repeat"
                        type="checkbox"
                        checked={this.state.repeat}
                        onChange={this.handleChangeRepeat}/>
                </label>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.repeatEvery} onChange={this.handleChange}>
                        <option value="year">Years</option>
                        <option value="month">Months</option>
                        <option value="day">Days</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}
