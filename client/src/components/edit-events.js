import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePlace = this.onChangePlace.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      type: "",
      description: "",
      place: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/event/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          type: response.data.type,
          place: response.data.place,
          description: response.data.description,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/api/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePlace(e) {
    this.setState({
      place: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    alert("Event Updated Successfully");
    const exercise = {
      username: this.state.username,
      type: this.state.type,
      description: this.state.description,
      place: this.state.place,
      date: this.state.date,
    };
    console.log(exercise);

    axios
      .post("/api/event/update/" + this.props.match.params.id, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Events</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: (max.80)</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Type of Event: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Place: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.place}
              onChange={this.onChangePlace}
            />
          </div>
          <div className="form-group">
            <label>Date: (mm/dd/yyyy)</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-warning" />
          </div>
        </form>
      </div>
    );
  }
}
