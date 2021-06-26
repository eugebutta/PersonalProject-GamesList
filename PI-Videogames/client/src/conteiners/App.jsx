import React from 'react';
import Home from '../components/Home.jsx'
import Genres from '../components/Genres'
import Header from './Header'
import GameDitail from '../components/GameDitail.jsx'
import { Switch, Route } from "react-router-dom";
import Landing from '../components/Landing.jsx'
import CreateGame from '../components/CreateGame.jsx';

const App = () => {
    return (
        <React.Fragment>


          <Switch>
          <div className="App">
          <Route exact path="/"  component={Landing} />
          <Route path={["/videogames", "/creategame", "/videogame/:id" ]} component={Header} />
          <Route path="/videogames" exact component={Home} />
          <Route path="/videogames/:id" exact component={GameDitail} />
          <Route path="/creategame" exact component={CreateGame} />
          <Route path="/genres/:value" exact component={Genres} />
        </div>
          </Switch>

         </React.Fragment>
    );
};

export default App;