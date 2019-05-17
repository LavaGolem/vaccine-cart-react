import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from "@material-ui/core";
import {format} from 'date-fns'


const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class VaccineCard extends React.Component {

  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <small>
          { format(this.props.date, 'dddd, DD MMM YYYY')}
          </small>
          </CardContent>
      </Card>
    )
  }
}

const VaccineCardWrapped = withStyles(styles)(VaccineCard);

export default VaccineCardWrapped;