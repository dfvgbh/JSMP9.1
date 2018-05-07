import React, { Component } from 'react';
import List from './List';
import Form from './Form';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
  }

  reloadDevices = () => {
    fetch('/api/device')
      .then(res => res.json())
      .then((res) => this.setState({ devices: res }))
      .catch(() => {});
  };

  componentDidMount() {
    this.reloadDevices();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <List devices={this.state.devices}
              onRefresh={this.reloadDevices}/>
        <Form onAdd={this.reloadDevices}/>
      </div>
    );
  }
}

export default App;
