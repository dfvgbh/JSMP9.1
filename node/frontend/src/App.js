import React, { Component } from 'react';
import List from './List';
import Form from './Form';
import Logs from './Logs';
import GroupsList from './GroupsList';
import GroupForm from './GroupForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      groups:  []
    };
  }

  reloadDevices = () => {
    fetch('/api/device')
      .then(res => res.json())
      .then((res) => this.setState({devices: res}))
      .catch(() => {
      });
  };

  reloadGroups = () => {
    fetch('/api/group')
      .then(res => res.json())
      .then((res) => this.setState({groups: res}))
      .catch(() => {
      });
  };

  reloadAll = () => {
    this.reloadDevices();
    this.reloadGroups();
  };

  componentDidMount() {
    this.reloadDevices();
    this.reloadGroups();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-content">
          <div className="App-content-item">
            <List devices={this.state.devices}
                  onRefresh={this.reloadAll}/>
            <Form onAdd={this.reloadDevices}/>
            <GroupsList groups={this.state.groups}
                        onRefresh={this.reloadAll}/>
            <GroupForm onAdd={this.reloadGroups}/>
          </div>
          <div className="App-logs App-content-item">
            <Logs />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
