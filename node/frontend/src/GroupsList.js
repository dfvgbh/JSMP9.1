import React, { Component } from 'react';

class GroupsList extends Component {
    onDelete = (id) => async () => {
        await fetch(`/api/group/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        this.props.onRefresh();
    };

    onUpdateStatus = async (id, isOn) => {
        await fetch(`/api/group/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ isOn })
        });
        this.props.onRefresh();
    };

    renderGroup(group) {
        return (
            <tr key={group.id}>
                <th scope="row">{group.id}</th>
                <td>{group.name}</td>
                <td>{group.devices.join(', ')}</td>
                <td>
                    <div className="btn-toolbar float-right" role="toolbar">
                        <div className="btn-group mr-2" role="group">
                            <button type="button"
                                    className={"btn btn-outline-primary " + (group.isOn && "active")}
                                    onClick={this.onUpdateStatus.bind(this, group.id, true)}
                            >On</button>
                            <button type="button"
                                    className={"btn btn-outline-primary " + (!group.isOn && "active")}
                                    onClick={this.onUpdateStatus.bind(this, group.id, false)}
                            >Off</button>
                        </div>
                        <div className="btn-group" role="group">
                          <button type="button" className="btn btn-outline-warning"
                                  onClick={this.onDelete(group.id)}
                          >Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    render() {
      const groups = this.props.groups.map((group) => this.renderGroup(group));

      return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Group Name</th>
                    <th scope="col">Devices</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                { groups }
                </tbody>
            </table>
        );
    }
}

export default GroupsList;
