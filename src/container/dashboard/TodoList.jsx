import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../assets/css/dashboard.css";

const TodoList = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const recordList = JSON.parse(localStorage.getItem("taskList"));
  const [taskList, setTaskList] = useState(recordList);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const [taskText, setTaskText] = useState("");

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() !== "" && userData) {
      const newtask = {
        text: taskText,
        id: recordList.length + 1,
        userId: userData.email,
        isCompleted: false,
      };
      const addData = recordList ? [...recordList, newtask] : [newtask];
      localStorage.setItem("taskList", JSON.stringify(addData));
      setTaskList(addData);
      setTaskText("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId) => {
    setEditIndex(taskId);
    setEditText(taskList.find((it) => it.id === taskId)?.text);
  };

  const handleSaveTask = (taskId) => {
    if (taskId) {
      const updatedTasks = [...taskList];
      updatedTasks.find((it) => it.id === taskId).text = editText;
      localStorage.setItem("taskList", JSON.stringify(updatedTasks));
      setTaskList(updatedTasks);
      setEditIndex(-1);
      setEditText("");
    }
  };

  const handleCompleteTasks = (task) => {
    const updatedTaskList = taskList.map((task1) =>
      task.id === task1.id
        ? { ...task1, isCompleted: !task1.isCompleted }
        : task1
    );
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const userSpecificList =
    userData.role === "Admin"
      ? taskList
      : taskList.filter((it) => it.userId === userData.email);

  return (
    <Row>
      <Col md={6}>
        <div className="todo-app">
          <h1 className="title">Todo List</h1>
          <ul className="unorder-list">
            {userSpecificList.map((task, index) => (
              <li key={index}>
                <div className="row taskList-row">
                  <div className="col-1">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleCompleteTasks(task)}
                    />
                  </div>
                  <div className="col-4">
                    {editIndex === task.id ? (
                      <textarea
                        type="text"
                        value={editText}
                        className={`${
                          task.isCompleted ? "text-underline" : ""
                        } edit-text`}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      <div
                        className={`${
                          task.isCompleted ? "text-underline" : ""
                        } text-break`}
                      >
                        {task.text}
                      </div>
                    )}
                  </div>
                  <Button
                    className="col-2 btns"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                  {editIndex === task.id ? (
                    <Button
                      className="col-2 btns"
                      onClick={() => handleSaveTask(task.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="col-2 btns"
                      onClick={() => handleEditTask(task.id)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Col>
      <Col md={6}>
        <div className="todo-app">
          <h1 className="title">Add Todo</h1>
          <div className="row add-todo">
            <div className="col-8">
              <input
                type="text"
                placeholder="Add a task"
                value={taskText}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-4">
              <Button onClick={() => handleAddTask()}>Add</Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoList;
