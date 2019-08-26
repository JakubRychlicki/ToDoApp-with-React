import React from "react";
import "../styles/Task.css";

const Task = props => {
  const { text, date, time, id, active, important, finishDate } = props.task;

  if (active) {
    return (
      <div className="taskBox" key={id}>
        <p>
          <button
            className="completeBtn"
            onClick={() =>
              setTimeout(function() {
                props.changeToCompleted(id);
              }, 500)
            }
          />
          <em>
            <span
              style={
                important
                  ? { color: "red", fontWeight: "bold" }
                  : { color: "black" }
              }
            >
              {text}
            </span>
            to {time} {date}
          </em>
          <span className="deleteBtn" onClick={() => props.delete(id)}></span>
        </p>
      </div>
    );
  } else {
    const date = new Date(finishDate).toLocaleDateString();

    return (
      <div className="taskBox" key={id}>
        <p>
          {text} - complete {date}
          <span className="deleteBtn" onClick={() => props.delete(id)}></span>
        </p>
      </div>
    );
  }
};

export default Task;
