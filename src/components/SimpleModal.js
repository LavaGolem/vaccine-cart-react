import React from 'react';
import PropTypes from 'prop-types';
import '../css/VaccineList.css'
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import DatePicker from "react-datepicker";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import "react-datepicker/dist/react-datepicker.css";
import Typography from '@material-ui/core/Typography';
import VaccineCardWrapped from './VaccineCard'
import {addDays, addMonths, addYears} from 'date-fns'
import '../css/VaccineForm.css'

const dropdownOptionStyle = {
  cursor: 'pointer'
}

const defaultVaccine = {
  id: -1,
  date: new Date(),
  name: '',
  additionalInfo: '',
  repeat: false,
  repeatEveryCount: 0,
  repeatEvery: 'month'
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: '#F2F2F2',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    borderRadius: '3px',
    outline: 'none'
  }
});


function getListOfVaccinationsDays(vaccine) {
  let date = vaccine.date;
  let datesArray = [date];
  if (vaccine.repeat === false) return datesArray;
  for (let i = 0; i < vaccine.repeatTimes - 1; i++) {
    date = getNewDate(vaccine.date, vaccine.repeatEveryCount, vaccine.repeatEvery)
    let newDate = new Date(date);
    datesArray.push(newDate);
  }
  return datesArray;
}

function getNewDate(currentDate, everyCount, type) {
  switch (type) {
    case "month":
      return addMonths(new Date(currentDate), everyCount);
    case "day":
      return addDays(new Date(currentDate), everyCount);
    case "year" :
      return addYears(new Date(currentDate), everyCount)
    default:
      return new Date()
  }
}

class SimpleModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      vaccine: defaultVaccine,
      open: false
    };
    if (this.props.open !== null) {
      this.state.open = this.props.open
    }
    if (this.props.vaccine !== null) {
      this.state.vaccine = this.props.vaccine
    }
    this.myRef = React.createRef();
  }

  getVaccineInstances = () => {
    const instancesArray = [];
    if (this.state.vaccine.repeat === 0) {
      instancesArray.push(this.state.vaccine.date, this.state.vaccine.name)
      return instancesArray;
    }
    if (this.state.vaccine.repeatEvery === 'DAY') {
      const interator = this.state.vaccine;
      var nextDay = new Date(this.state.vaccine.date.getTime() + 1 * 24 * 60 * 60 * 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({open: nextProps.open});
    }
    if (nextProps.vaccine !== this.state.vaccine) {
      this.setState({vaccine: (nextProps.vaccine === null ? defaultVaccine : nextProps.vaccine)});
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChangeDate = (date) => {
    const vaccine = {...this.state.vaccine, date: date};
    this.setState({vaccine: vaccine});
  }

  handleChangeName = event => {
    const vaccine = {...this.state.vaccine, name: event.target.value};
    this.setState({vaccine});
  }

  handleChangeRepeat = event => {
    const vaccine = {...this.state.vaccine, repeat: event.target.checked};
    this.setState({vaccine: vaccine});
  }

  handleChangeRepeatEvery = event => {
    const vaccine = {...this.state.vaccine, repeatEvery: event.target.value};
    this.setState({vaccine: vaccine})
  }

  handleChangeRepeatTimes = event => {
    const vaccine = {...this.state.vaccine, repeatTimes: event.target.value};
    this.setState({vaccine: vaccine})
  }

  handleChangeRepeatEveryCount = event => {
    const vaccine = {...this.state.vaccine, repeatEveryCount: event.target.value};
    this.setState({vaccine: vaccine})
  }


  handleChangeAdditionalInfo = event => {
    const vaccine = {...this.state.vaccine, additionalInfo: event.target.value};
    this.setState({vaccine});
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Add Vaccine</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <h1 className='form-header'>
              Vaccine info
            </h1>
            <br/>
            <div>
              <form onSubmit={this.addVaccine} action="">
                <FormLabel className='form-container'>
                  <label className='form-child-label'>Name:</label>
                  <input className='form-child-input'
                         value={this.state.vaccine.name}
                         onChange={this.handleChangeName}
                         type="text" name="name"/>
                </FormLabel>
                <FormLabel className='form-container'>
                  <label className='form-child-label'>Date:</label>
                  <div className='form-child-input date-input'>
                    <DatePicker
                      ref={this.myRef}
                      selected={this.state.vaccine.date}
                      onChange={this.handleChangeDate}
                    />
                  </div>
                </FormLabel>
                <InputLabel className='form-container'>
                  <label className='form-child-label'>Additional info:</label>
                  <textarea className='form-child-input' multiline={true} value={this.state.vaccine.additionalInfo}
                            onChange={this.handleChangeAdditionalInfo}/>
                </InputLabel>
                <FormLabel className='form-container-repeat'>
                  <label className='form-child-label'>Repeat:</label>
                  <div className='form-child-input'>
                    <Checkbox
                      name="repeat"
                      checked={this.state.vaccine.repeat}
                      onChange={this.handleChangeRepeat}
                      color="primary"
                    />
                  </div>
                </FormLabel>
                {this.state.vaccine.repeat &&
                <div className='form-container'>
                  <div className='form-child-input-repeat-1'>
                    <FormLabel>
                      Times:&nbsp;
                      <Select value={this.state.vaccine.repeatTimes} onChange={this.handleChangeRepeatTimes}>
                        <option style={dropdownOptionStyle} value="2">2</option>
                        <option style={dropdownOptionStyle} value="3">3</option>
                        <option style={dropdownOptionStyle} value="4">4</option>
                      </Select>
                    </FormLabel>
                  </div>
                  <div className='form-child-input-repeat-2'>
                    <FormLabel className='form-child-input-repeat'>
                      Every:&nbsp;
                      <Select value={this.state.vaccine.repeatEveryCount} onChange={this.handleChangeRepeatEveryCount}>
                        <option style={dropdownOptionStyle} value="2">2</option>
                        <option style={dropdownOptionStyle} value="3">3</option>
                        <option style={dropdownOptionStyle} value="4">4</option>
                      </Select>
                    </FormLabel>
                    <FormLabel className='form-child-input-repeat'>
                      &nbsp;
                      <Select value={this.state.vaccine.repeatEvery} onChange={this.handleChangeRepeatEvery}>
                        <option style={dropdownOptionStyle} value="year">Years</option>
                        <option style={dropdownOptionStyle} value="month">Months</option>
                        <option style={dropdownOptionStyle} value="day">Days</option>
                      </Select>
                    </FormLabel>
                  </div>
                </div>
                }
                <small>Iterations</small>
                {
                  getListOfVaccinationsDays(this.state.vaccine)
                    .map(date =>
                      <VaccineCardWrapped date={date}></VaccineCardWrapped>
                    )
                }
                <Button variant={"outlined"} type="submit" value="Submit">Submit</Button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;