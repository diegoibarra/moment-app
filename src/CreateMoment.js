import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import momentActions from './momentActions.js'
import globalHook from 'use-global-hook';
import DatePicker from './DatePicker.js';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// core components
import Button from "./components/CustomButtons/Button.js";

//import modalStyle from "./assets/jss/material-dashboard-pro-react/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

//const useStyles = makeStyles(modalStyle);
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
},
  input: {
      display: 'none'
  }
}));

const initialState = {
  modal: false,
  color: '',
  date: new Date(),
  message: '',
  highlight: ''
};

const handleSubmit = (modalState, modalActions, props) => {
    props.globalActions.addMoment({
        message: modalState.message,
        date: modalState.date,
        highlight: modalState.highlight,
        color: bgColors[modalState.color],
        image: modalState.image
    })
    modalActions.setColor('')
    modalActions.setMessage(' ')
    modalActions.setModal(false)
}

const bgColors = {
    "Blue": "#00B1E1",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
    "Orange": "#FFA500",
    "Purple": "#800080",
}

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'];
const useGlobal = globalHook(React, initialState, momentActions);

export default function CreateMoment(props) {
  const [modalState, modalActions] = useGlobal();
  const classes = useStyles();

  return (
    <div>
        <div>
        <Button color="rose" round onClick={() => modalActions.setModal(true)}>
          Create Moment
        </Button>
      </div>
      <Dialog
        open={modalState.modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => modalActions.setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
      <form id="create-form" className={classes.root} noValidate autoComplete="off">
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
        >
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => modalActions.setModal(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
        >
            <DatePicker modalState={modalState} modalActions={modalActions}
            />
            <TextField
                id="standard-basic"
                label="Message"
                value={modalState.message}
                onChange={(event) => modalActions.setMessage(event.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Highlight"
                value={modalState.highlight}
                onChange={(event) => modalActions.setHighlight(event.target.value)}
            />
            <TextField
              id="standard-select-color"
              select
              label="Select"
              value={modalState.color}
              onChange={(event) => modalActions.setColor(event.target.value)}
              helperText="Please select your color"
            >
              {colors.map(colorOption => (
                <MenuItem
                    key={colorOption}
                    value={colorOption}
                    style={{
                            color: 'white',
                            backgroundColor: bgColors[colorOption]
                        }}
                >
                  {colorOption}
                </MenuItem>
              ))}
            </TextField>
            <input accept="image/*" className={classes.input}
              onChange={(event) => modalActions.setImage(event.target.files[0])}
               id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
          <h5>Are you sure you want to do this?</h5>
        </DialogContent>
        <DialogActions
        >
          <Button onClick={() => modalActions.setModal(false)}>Never Mind</Button>
          <Button type="submit" form="create-moment"
            onClick={() => handleSubmit(modalState, modalActions, props)}
            color="success"
          >
            Yes
          </Button>
        </DialogActions>
      </form>

      </Dialog>
    </div>
  );
}
