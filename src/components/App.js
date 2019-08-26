import React, { Component, Fragment } from "react";
import "../styles/App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

class App extends Component {
  counter = 0;
  state = {
    tasks: [],
    status: true,
    sortBy: "Newest"
  };

  addTask = (text, important, category, date, time) => {
    let czas = time.replace(":", "");
    const data = Date.parse(date);
    const alltime = parseInt(czas) + data;

    const task = {
      id: this.counter,
      text,
      important,
      category,
      date,
      time,
      alltime: alltime,
      active: true,
      finishDate: null
    };
    this.counter++;

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }));

    return true;
  };

  handleClick = e => {
    let name = e.target.className;
    if (name === "activeTasks") {
      this.setState({
        status: true
      });
    } else if (name === "doneTasks") {
      this.setState({
        status: false
      });
    }
  };

  deleteTask = id => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(task => task.id !== id);
    this.setState({
      tasks
    });
  };

  changeTaskToCompleted = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
    });
    this.setState({
      tasks
    });
  };

  sortBy = e => {
    const name = e.target.value;
    this.setState({
      sortBy: name
    });
  };

  taskComplete = () => {
    const tasks = [...document.querySelectorAll(".taskBox p")];
    tasks.forEach(task => {
      task.childNodes[0].addEventListener("click", function() {
        task.childNodes[0].classList.add("bgc");
        task.childNodes[1].classList.add("deletion");
      });
    });
  };

  componentDidUpdate() {
    this.taskComplete();
  }

  render() {
    return (
      <Fragment>
        <div className="app">
          <AddTask addTask={this.addTask} tasks={this.state.tasks} />
          <TaskList
            tasks={this.state.tasks}
            changeTasks={this.handleClick}
            statusChange={this.state.status}
            delete={this.deleteTask}
            changeToCompleted={this.changeTaskToCompleted}
            sortByChange={this.sortBy}
            sortName={this.state.sortBy}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
