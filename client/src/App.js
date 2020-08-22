import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsList from "./components/upcoming-events";
import EditEvent from "./components/edit-events";
import CreateEvent from "./components/create-event";
import CreateUser from "./components/create-user";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <br />
          <Route path="/" exact component={EventsList} />
          <Route path="/edit/:id" component={EditEvent} />
          <Route path="/create" component={CreateEvent} />
          <Route path="/user" component={CreateUser} />
        </div>
      </div>
    </Router>
  );
}

export default App;
