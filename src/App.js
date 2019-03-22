import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.scss';
import {Movies} from "./movies/movies";
import {Characters} from "./characters/characters";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Movies}/>
                    <Route exact path="/characters" component={Characters}/>
                </div>
            </Router>
        );
    }
}

export default App;
