import React, { Component } from 'react';
import './css/VaccineList.css'

export class CompleteEvent extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      id: this.props.id
    }
  }

  handleClick() {
    this.props.onClick(this.state.id);
  }

  render() {
    return(
      <button onClick={this.handleClick}> Done</button>
    )
  }
}
