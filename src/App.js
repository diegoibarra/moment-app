import React from 'react';
import logo from './logo.svg';
import globalHook from 'use-global-hook';
import actions from './actions.js'
import MomentCard from './MomentCard.js'
import MomentView from './MomentView.js'
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import AppAppBar from './TempComponents/AppAppBar.js'
import Login from './Login.js'
import CreateMoment from './CreateMoment.js';
import './App.css';

const initialState = {
  moments: {},
  signedIn: false,
  user_id: null
};

const useGlobal = globalHook(React, initialState, actions);

function App() {
    const [globalState, globalActions] = useGlobal();
    const moments_object = globalState.moments
  return (
      <BrowserRouter >
        {/* Just a test to see if the route redirect works*/}
        <div className="App">
            <AppAppBar globalState={globalState}/>
            {globalState.signedIn ? <Redirect to='/main' /> : <div></div>
            /*<Redirect to="/login" />*/}
            <Route exact path="/login" render={() => console.log("create login form")} />
            <Route exact path="/sign-up" render={() => <Login signIn={false}
            globalState={globalState} globalActions={globalActions}
            />} />
            <Route exact path="/sign-in" render={() => <Login signIn={true}
                globalState={globalState} globalActions={globalActions}/>} />
            <Route exact path="/main" render={() => globalState.signedIn ?
                <header className="App-header">
                  <MomentView moments_object={moments_object} globalActions={globalActions}/>

                  <CreateMoment globalState={globalState} globalActions={globalActions}/>
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header> : <div></div>
            }/>
        </div>
    </BrowserRouter>
  );
}

export default App;
