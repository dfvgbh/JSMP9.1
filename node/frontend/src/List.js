import React, { Component } from 'react';

class List extends Component {
    onDelete = (id) => async () => {
        await fetch(`/api/device/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        this.props.onRefresh();
    };

    onUpdateStatus = async (id, isOn) => {
        await fetch(`/api/device/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ isOn })
        });
        this.props.onRefresh();
    };

    renderDevice(index) {
        const device = this.props.devices[index];

        return (
            <tr key={device.id}>
                <th scope="row">{device.id}</th>
                <td>{device.name}</td>
                <td>{device.ip}</td>
                <td>
                    <div className="btn-toolbar float-right" role="toolbar">
                        <div className="btn-group mr-2" role="group">
                            <button type="button"
                                    className={"btn btn-outline-primary " + (device.isOn && "active")}
                                    onClick={this.onUpdateStatus.bind(this, device.id, true)}>On</button>
                            <button type="button"
                                    className={"btn btn-outline-primary " + (!device.isOn && "active")}
                                    onClick={this.onUpdateStatus.bind(this, device.id, false)}>Off</button>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-outline-warning"
                                    onClick={this.onDelete(device.id)}>Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    render() {
        const devices = this.props.devices.map((device, index) => this.renderDevice(index));

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Device Name</th>
                        <th scope="col">Device Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { devices }
                </tbody>
            </table>
        );
    }
}

export default List;
