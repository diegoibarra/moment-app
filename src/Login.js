import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import loginActions from './loginActions.js'
import globalHook from 'use-global-hook';
import axios from 'axios';
import LoginForm from './LoginForm';

//import modalStyle from "./assets/jss/material-dashboard-pro-react/modalStyle.js";

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
    username: '',
    password: ''
};

const handleSubmit = (globalState, globalActions) => {
    console.log("Let's handle Submit")
    console.log(globalState)
    console.log(globalActions)
    axios.post('/api/login', globalState)
    .then(resp => {
        console.log(resp)
      if (resp.data.success) {
          console.log("Able to sign user in!")
        globalActions.updateSignIn(globalState, resp.data.success);
        /*axios.get('/api/account')
        .then(res => this.props.updateUser(res.data.user))*/
    } else console.log("Unable to sign user in")//this.setState({failedLoginAlert: true});
    });
}


const useGlobal = globalHook(React, initialState, loginActions);

export default function Login(props) {
  const [modalState, modalActions] = useGlobal();
  const classes = useStyles();

  return (
    <div>
      {/*<LoginNavBar/>*/}
       <LoginForm modalActions={modalActions} handleSubmit={() => handleSubmit(modalState, props.globalActions)}/>
    </div>

  );
}
