import React from 'react';
import PropTypes from 'prop-types';
import '../css/VaccineList.css'
import { withStyles } from '@material-ui/core/styles';
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


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

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
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      vaccine: defaultVaccine,
      open: false
    };
    if(this.props.open !== null) {
      this.state.open = this.props.open
    }
    if (this.props.vaccine !== null) {
      this.state.vaccine = this.props.vaccine
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
    if(nextProps.vaccine !== this.state.vaccine) {
      this.setState({vaccine: (nextProps.vaccine === null ? defaultVaccine : nextProps.vaccine)});
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Add Vaccine</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography component="h3" variant="h5">
              Vaccine info
            </Typography>
            <br/>
            <div>
              <form onSubmit={this.addVaccine} action="">
                <FormLabel>
                  Name:&nbsp;
                  <Input value={this.state.vaccine.name} onChange={this.handleChangeName} type="text" name="name"/>
                </FormLabel>
                <br/><br/>
                <FormLabel>
                  Date:&nbsp;
                  <DatePicker
                    selected={this.state.vaccine.date}
                    onChange={this.handleChangeDate}
                  />
                </FormLabel>
                <br/><br/>
                <InputLabel>
                  Additional info:&nbsp;
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
                { this.state.vaccine.repeat &&
                  <FormLabel>
                    Every:&nbsp;
                    <Select value={this.state.vaccine.repeatEvery} onChange={this.handleChangeRepeatEvery}>
                      <option style={dropdownOptionStyle} value="year">Years</option>
                      <option style={dropdownOptionStyle} value="month">Months</option>
                      <option style={dropdownOptionStyle} value="day">Days</option>
                    </Select>
                  </FormLabel>
                }
                <br/><br/>
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