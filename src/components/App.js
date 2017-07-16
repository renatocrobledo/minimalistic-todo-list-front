import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import TasksService from '../services/tasks';
import SweetAlert from '../components/SweetAlert';
import moment from 'moment';
import { Button } from 'react-bootstrap';

// tasks: {
//   1:
//   2:
//   3:
// }


class App extends Component {
  state = {
    tasks: [],
    updatedData: {},
    showSweetAlert: false,
    selectedTask: {}
  }

  getTasks = () => {
    TasksService.get()
      .then((tasks) => {
        this.setState({tasks});
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
          this.refs.taskEntry.placeholder = '';
          this.setState({
            tasks: [...this.state.tasks, task]
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
    // const selectedTask = this.getState({ tasks[id] });
    const selectedTask = {
      id,
      status: e.target.getAttribute('data-status'),
      text: e.target.getAttribute('data-value'),
      createdAt: e.target.getAttribute('data-created-at'),
    };

    this.setState({
      selectedTask,
      showSweetAlert: true
    });

  }

  updateTask = (id, updatedData) => {
    const dataToUpdate = updatedData || this.state.updatedData;

    if (dataToUpdate) {
      TasksService.update(id, dataToUpdate)
        .then((response) => {
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
    this.state.tasks.forEach((task) => {
      this.deleteTask(task._id);
    });
  }

  setAllDone = () => {
    this.state.tasks.forEach((task) => {
      this.updateTask(task._id, {status: 'done'});
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
    const tasks = this.state.tasks.map((t) => {
      const createdAt = moment(t.createdAt * 1).format("MMMM DD, YYYY, HH:mm  ");
      return <Task status={t.status} createdAt={createdAt} text={t.text} key={t._id} id={t._id} onClick={this.taskClick}/>
    });

    const clearBtns = tasks.length ? this.getClearBtns() : null;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
          <div>
            <input
              ref='taskEntry'
              className="Task-imput"
              onKeyPress={(e) => this.createTask(e)}
              type="text"
              placeholder="Type your task here and press enter!"
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
