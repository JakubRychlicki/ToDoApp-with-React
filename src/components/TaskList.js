import React from "react";
import "../styles/TaskList.css";
import Task from "./Task";

const TaskList = props => {
  const activeT = props.tasks.filter(task => task.active);
  const doneT = props.tasks.filter(task => !task.active);

  // Sorting

  if (doneT.length >= 2) {
    doneT.sort((a, b) => {
      if (a.finishDate < b.finishDate) {
        return 1;
      }
      if (a.finishDate > b.finishDate) {
        return -1;
      }
      return 0;
    });
  }

  if (props.sortName === "Newest") {
    if (activeT.length >= 2) {
      activeT.sort((a, b) => {
        if (a.alltime > b.alltime) {
          return 1;
        }
        if (a.alltime < b.alltime) {
          return -1;
        }
        return 0;
      });
    }
  }

  if (props.sortName === "Eldest") {
    if (activeT.length >= 2) {
      activeT.sort((a, b) => {
        if (a.alltime < b.alltime) {
          return 1;
        }
        if (a.alltime > b.alltime) {
          return -1;
        }
        return 0;
      });
    }
  }

  const activeTasks = activeT.map(task => (
    <Task
      key={task.id}
      task={task}
      delete={props.delete}
      changeToCompleted={props.changeToCompleted}
    />
  ));
  const doneTasks = doneT.map(task => (
    <Task key={task.id} task={task} delete={props.delete} />
  ));
  return (
    <>
      <div style={{ position: "relative" }}>
        <p className="tasksTitle">
          <span className="activeTasks" onClick={props.changeTasks}>
            Active
          </span>
          <span>/</span>
          <span className="doneTasks" onClick={props.changeTasks}>
            Completed
          </span>
        </p>
        <div className="sortBox">
          <label>Sort By</label>
          <select name="sort" id="sort" onChange={props.sortByChange}>
            <option value="Newest">Newest</option>
            <option value="Eldest">Eldest</option>
          </select>
        </div>
      </div>
      <div className="tasksList">
        {props.statusChange ? activeTasks : doneTasks}
      </div>
      <div className="tasksLength">
        <p>
          Number of tasks (
          <span>
            {props.statusChange ? activeTasks.length : doneTasks.length}
          </span>
          )
        </p>
      </div>
    </>
  );
};
export default TaskList;
