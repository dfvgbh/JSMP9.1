import React, { Component } from 'react';
import './Logs.css';

class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  refreshLogs = () => {
    fetch('/api/log')
      .then(res => res.json())
      .then(logs => this.setState({ logs }));
  };

  componentDidMount() {
    this.refreshLogs();
  }

  render() {
    const records = this.state.logs
      .map(({ id, record }) => <li key={id}>{record}</li>);

    return (
      <aside className="Logs">
        <h4>LOGS</h4>
        <ul className="Logs-list">
          { records }
        </ul>
        <button onClick={this.refreshLogs}>REFERSH</button>
      </aside>
    );
  }
}

export default Logs;