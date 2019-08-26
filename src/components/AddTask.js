import React, { Component, Fragment } from "react";
import "../styles/AddTask.css";

class AddTask extends Component {
  today = new Date().toISOString().slice(0, 10);

  state = {
    text: "",
    important: false,
    category: "other",
    time: "00:00",
    date: this.today
  };

  handleText = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleCategory = e => {
    e.preventDefault();

    if (e.target.id === "other") {
      this.setState({
        category: "other"
      });
    } else if (e.target.id === "home") {
      this.setState({
        category: "home"
      });
    } else if (e.target.id === "school") {
      this.setState({
        category: "school"
      });
    } else if (e.target.id === "work") {
      this.setState({
        category: "work"
      });
    }
  };

  handleCheckbox = e => {
    this.setState({
      important: e.target.checked
    });
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleTime = e => {
    this.setState({
      time: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    const { text, important, category, date, time } = this.state;
    if (text.length <= 30) {
      if (text.length > 3 && date[0] === "2" && date[1] === "0") {
        const add = this.props.addTask(text, important, category, date, time);
        if (add) {
          this.setState({
            text: "",
            time: "00:00",
            date: this.today,
            important: false,
            category: "default"
          });
        }
      }
    }
  };

  clearRubber = () => {
    this.setState({
      text: "",
      time: "00:00",
      date: this.today,
      important: false,
      category: "default"
    });
  };

  render() {
    let maxDate = this.today.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";

    return (
      <Fragment>
        <div className="form">
          <div className="clearBox">
            <div className="buttonClear" onClick={this.clearRubber} />
          </div>
          <div className="formBox">
            <div className="leftSide">
              <div className="dateBox">
                <div className="iconDate" />
                <input
                  type="date"
                  value={this.state.date}
                  onChange={this.handleDate}
                  min={this.today}
                  max={maxDate}
                />
              </div>
              <div className="timeBox">
                <div className="iconTime" />
                <input
                  type="time"
                  value={this.state.time}
                  onChange={this.handleTime}
                />
              </div>
            </div>
            <div className="rightSide">
              <div className="impoBox">
                <div className="iconImpo" />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={this.state.important}
                    id="important"
                    onChange={this.handleCheckbox}
                  />
                  <span className="checkbox-custom" />
                </label>
              </div>
              <div className="categoryBox">
                <div>
                  <div
                    style={
                      this.state.category === "other"
                        ? { border: "2px dotted #ee2838", borderRadius: "50%" }
                        : { border: "none", borderRadius: "50%" }
                    }
                    className="category-Other"
                    onClick={this.handleCategory}
                    id="other"
                  />
                  <div
                    style={
                      this.state.category === "home"
                        ? { border: "2px dotted #ee2838", borderRadius: "50%" }
                        : { border: "none", borderRadius: "50%" }
                    }
                    className="category-Home"
                    onClick={this.handleCategory}
                    id="home"
                  />
                  <div
                    style={
                      this.state.category === "school"
                        ? { border: "2px dotted #ee2838", borderRadius: "50%" }
                        : { border: "none", borderRadius: "50%" }
                    }
                    className="category-School"
                    onClick={this.handleCategory}
                    id="school"
                  />
                  <div
                    style={
                      this.state.category === "work"
                        ? { border: "2px dotted #ee2838", borderRadius: "50%" }
                        : { border: "none", borderRadius: "50%" }
                    }
                    className="category-Work"
                    onClick={this.handleCategory}
                    id="work"
                  />
                </div>
              </div>
            </div>
            <div className="nameCategory">
              Category: <p>{this.state.category}</p>
            </div>
          </div>
          <div className="textBox">
            <input
              type="text"
              placeholder="enter your task"
              value={this.state.text}
              onChange={this.handleText}
            />
            <div className="buttonBox" onClick={this.handleClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddTask;
