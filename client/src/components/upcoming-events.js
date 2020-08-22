import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Event = (props) => (
  <tr>
    <td>{props.event.username}</td>
    <td>{props.event.type}</td>
    <td>{props.event.description}</td>
    <td>{props.event.place}</td>
    <td>{props.event.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.event._id}>
        <input type="submit" value="Edit" className="btn btn-secondary" />
      </Link>{" "}
      <a
        href=""
        onClick={() => {
          alert("Are you sure you want to delete");
          props.deleteEvent(props.event._id);
        }}
      >
        {" "}
        <input type="submit" value="Delete" className="btn btn-danger" />
      </a>
    </td>
  </tr>
);

export default class EventsList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this);

    this.state = { events: [] };
  }

  componentDidMount() {
    axios
      .get("/api/event/")
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteEvent(id) {
    axios.delete("/api/event/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      events: this.state.events.filter((el) => el._id !== id),
    });
  }

  eventslist() {
    return this.state.events.map((currentevent) => {
      return (
        <Event
          event={currentevent}
          deleteEvent={this.deleteEvent}
          key={currentevent._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Upcoming Events</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Event Description</th>
              <th>Place</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.eventslist()}</tbody>
        </table>
      </div>
    );
  }
}
