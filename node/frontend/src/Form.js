import React, { Component } from 'react';

class Form extends Component {
    constructor (props) {
        super(props);
        this.state={
            name: '',
            ip: '22'
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/device', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        })
        .then(() => this.props.onAdd());
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <form className="form-inline" onSubmit={this.onSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="deviceName" className="sr-only">Device Name</label>
                    <input type="text" className="form-control" id="deviceName" placeholder="Device Name"
                           value={this.state.name}
                           onChange={this.onChange}
                           name='name'/>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="deviceAddress" className="sr-only">IP Address</label>
                    <input type="text" className="form-control" id="deviceAddress" placeholder="IP Address"
                            value={this.state.ip}
                            onChange={this.onChange}
                            name='ip'/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add Device</button>
            </form>
        );
    }
}

export default Form;
