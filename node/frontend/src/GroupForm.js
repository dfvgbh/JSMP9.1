import React, { Component } from 'react';

class GroupForm extends Component {
    constructor (props) {
        super(props);
        this.state={
            groupName: '',
            deviceName: ''
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/group', {
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
                    <input type="text" className="form-control" id="groupName" placeholder="Group Name"
                           value={this.state.groupName}
                           onChange={this.onChange}
                           name='groupName'/>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input type="text" className="form-control" id="deviceName" placeholder="Device Name"
                            value={this.state.deviceName}
                            onChange={this.onChange}
                            name='deviceName'/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add Device</button>
            </form>
        );
    }
}

export default GroupForm;
