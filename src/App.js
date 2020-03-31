import React from 'react';
import logo from './logo.svg';
import globalHook from 'use-global-hook';
import actions from './actions.js'
import MomentCard from './MomentCard.js'
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login.js'
import CreateMoment from './CreateMoment.js';
import './App.css';

const initialState = {
  moments: {},
  signedIn: false
};

const useGlobal = globalHook(React, initialState, actions);

function App() {
    const [globalState, globalActions] = useGlobal();
    const moments_object = globalState.moments
  return (
      <BrowserRouter >
        {/* Just a test to see if the route redirect works*/}
        {/*<Route exact path="/" render={() => <Redirect to='/main' />} />*/}
        <div className="App">
            {globalState.signedIn ? <Redirect to='/main' /> :
            <Redirect to="/login" />}
            <Route exact path="/login" render={() => console.log("create login form")} />

            <Route exact path="/login" render={() => <Login
                globalState={globalState} globalActions={globalActions}/>} />
            <Route exact path="/main" render={() => <div>
                <header className="App-header">
                  {Object.keys(moments_object).map((moment) => {
                      return (
                          <MomentCard key={moments_object[moment].message}
                          globalActions={globalActions}
                          moment={moments_object[moment]}/>
                      )

                  })}

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
                </header>
                </div>
            } />
        </div>
    </BrowserRouter>
  );
}

export default App;
