import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import TasksService from '../services/tasks';
import SweetAlert from '../components/SweetAlert';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class App extends Component {
  state = {
    tasks: {},
    updatedData: {},
    showSweetAlert: false,
    selectedTask: {}
  }

  mergeTasks = (acc, task) => {
    const actualTask = {
      [task._id]: task
    };
    actualTask[task._id].createdAt = moment(task.createdAt).format("MMMM DD, YYYY, HH:mm  ");
    return Object.assign(acc, actualTask);
  }

  getTasks = () => {
    TasksService.get()
      .then((tasks) => {
        const jsonTasks = tasks.reduce(this.mergeTasks,{});
        this.setState({tasks: jsonTasks});
      });
  }

  componentWillMount() {
    this.getTasks();
  }

  handleChange = (selectedTask, e) => {
    const task = Object.assign(this.state.selectedTask, selectedTask);
    this.setState(task);
  }

  closeAlert = () => {
    this.setState({ showSweetAlert: false});
  }

  createTask = (e) => {
    if(e.key === 'Enter' && e.target.value){
      TasksService.create(e.target.value)
        .then((task) => {
          this.refs.taskEntry.value = '';
          this.setState({
            tasks: this.mergeTasks(this.state.tasks, task)
          });
      });
    }
  }

  deleteTask = (id) => {
    if(id) {
      TasksService.delete(id)
      .then((response) => {
        this.getTasks();
        this.closeAlert();
      });
    }
  }


  taskClick = (id, e) => {

    const selectedTask = this.state.tasks[id];

    this.setState({
      selectedTask,
      showSweetAlert: true
    });

  }

  updateTask = (id, updatedData) => {
    const dataToUpdate = updatedData || this.state.updatedData;

    if (dataToUpdate) {
      TasksService.update(id, dataToUpdate)
        .then((response)=>{
          this.getTasks();
          this.closeAlert();
      });
    }
  }

  setUpdate = (id, updatedData, e) => {

    if(e && e.key === 'Enter') this.updateTask(id);

    if(updatedData) {
      this.setState({
        updatedData
      });
    }
  }

  deleteAll = () => {
    Object.keys(this.state.tasks).forEach((taskId)=>{
      this.deleteTask(taskId);
    });
  }

  setAllDone = () => {
    Object.keys(this.state.tasks).forEach((taskId)=>{
      this.updateTask(taskId, {status: 'done'});
    });
  }

  getClearBtns = () => {
    return (
      <div>
        <Button bsStyle='danger' onClick={this.deleteAll}>Delete all</Button>
        <Button bsStyle='warning' onClick={this.setAllDone}>All done!</Button>
      </div>
    );
  }

  render() {

    const tasks = Object.keys(this.state.tasks).map((taskId) => {
      const {status, text, createdAt} = this.state.tasks[taskId];
      return <Task
                status={status}
                text={text}
                key={taskId}
                id={taskId}
                createdAt={createdAt}
                onClick={this.taskClick}
              />
    });


    const clearBtns = tasks.length ? this.getClearBtns() : null;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
          <div>
            <input
              type="text"
              placeholder="Type your task here and press enter!"
              ref='taskEntry'
              className="Task-imput"
              onKeyPress={(e) => this.createTask(e)}
            />
          </div>
          <br />
          {clearBtns}
          {tasks}
          <SweetAlert
            updateTask={this.updateTask}
            setUpdate={this.setUpdate}
            deleteTask={this.deleteTask}
            handleChange={this.handleChange}
            show={this.state.showSweetAlert}
            closeAlert={this.closeAlert}
            selectedTask={this.state.selectedTask}
          />
      </div>
    );
  }
}

export default App;
