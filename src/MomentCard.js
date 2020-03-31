import React from "react";
import MomentPictureCard from './MomentPictureCard.js'
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./components/Card/Card.js";
import ReactCardFlip from 'react-card-flip';
import CardBody from "./components/Card/CardBody.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from "./components/Card/CardHeader.js";
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import FlipIcon from '@material-ui/icons/Flip';

import { cardTitle } from "./assets/jss/material-kit-react.js";

const styles = {
  cardTitle,
};

var loadFile = function(file) {
	file.src = URL.createObjectURL(file);

    return file
};

var formatString = (d) => {
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d)

    return mo + "/" + da + "/" + ye
}

const useStyles = makeStyles(styles);

export default function MomentCard(props) {
  const classes = useStyles();
  const [flippedState, changeFlip] = React.useState(false);
  loadFile(props.moment.image)

  return (
      <ReactCardFlip isFlipped={flippedState} flipDirection="horizontal">
      <Card style={{width: "20rem"}}>
            <CardHeader style={{
                color: 'white',
                backgroundColor: props.moment.color
            }}>{formatString(props.moment.date)}</CardHeader>
            <MomentPictureCard key={props.moment.message}
            globalActions={props.globalActions}
            moment={props.moment}
            changeFlip={changeFlip}
            flippedState={flippedState}
            />
      </Card>
      <Card style={{width: "20rem", }}>
        <CardHeader style={{
            color: 'white',
            backgroundColor: props.moment.color
        }}>{formatString(props.moment.date)}</CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>{props.moment.highlight}</h4>
          <p>
            {props.moment.message}
          </p>
          <IconButton color="primary"
              onClick={(e) => props.globalActions.removeMoment(e.target.id)}>
            <RemoveIcon id={props.moment.message}/>
          </IconButton>
          <IconButton color="primary"
              onClick={() => changeFlip(!flippedState)}>
            <FlipIcon id={props.moment.message}/>
          </IconButton>
        </CardBody>
      </Card>
      </ReactCardFlip>
  );
}
