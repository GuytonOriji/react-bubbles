import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {PrivateRoute} from './components/PR/'
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage'
function App() {
  return (
      <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path='/BubblePage' component={BubblePage} />

        </Switch>
      </div>
  );
}

export default App;
