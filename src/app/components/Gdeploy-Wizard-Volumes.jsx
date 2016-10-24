var React = require('react');
import Selectbox from './Selectbox.jsx'

class VolumeRow extends React.Component {
    constructor(props) {
        super(props);
        this.volumeTypes = [
            { key: "distribute", title: "Distribute" },
            { key: "replicate", title: "Replicate" },
            { key: "distribute-repliacte", title: "Distribute Replicate" }
        ]
    }
    render() {
        return (<tr>
            <td style={{ width: "25%" }}>
                <input type="text" className="form-control" value={this.props.volume.name} onChange={(e) => this.props.onUpdate(this.props.index, "name", e.target.value)} />
            </td>
            <td style={{ width: "25%" }}>
                <Selectbox optionList={this.volumeTypes} selected={this.props.volume.type} onChange={(e) => this.props.onUpdate(this.props.index, "type", e.target.value)} />
            </td>
            <td style={{ width: "10%" }}>
                <input type="checkbox" className="form-control" checked={this.props.volume.is_arbiter} onChange={(e) => this.props.onUpdate(this.props.index, "is_arbiter", e.target.checked)} />
            </td>
            <td style={{ width: "25%" }}>
                <input type="text" className="form-control" value={this.props.volume.brick_dir} onChange={(e) => this.props.onUpdate(this.props.index, "brick_dir", e.target.value)} />
            </td>
            <td style={{ width: "15%" }}>
                <button className="btn btn-primary" type="button" onClick={this.props.onAdd}>+</button>
                <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>-</button>
            </td>
        </tr>
        )
    }
}

class WizardVolumesStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volumes: props.volumes
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        if (this.state.volumes.length === 0) {
            this.handleAdd();
        }
    }
    handleDelete(index) {
        let volumes = this.state.volumes
        volumes.splice(index, 1);
        if(volumes.length === 0){
            volumes.push(this.getEmptyRow())
        }
        this.setState({ volumes: volumes })
    }
    getEmptyRow() {
        return { name: "", type: "replicate", is_arbiter: true, brick_dir: "" }
    }
    handleAdd() {
        let volumes = this.state.volumes
        volumes.push(this.getEmptyRow())
        this.setState({ volumes: volumes })
    }
    handleUpdate(index, property, value) {
        let volumes = this.state.volumes
        volumes[index][property] = value
        this.setState({ volumes: volumes })
    }
    render() {
        var volumeRows = [];
        this.state.volumes.forEach(function (volume, index, allVolumes) {
            volumeRows.push(<VolumeRow volume={volume} key={index} index={index} onUpdate={this.handleUpdate} onDelete={() => this.handleDelete(index)} onAdd={this.handleAdd} />)
        }, this)
        return (
            <form className="form-horizontal">
                <table style={{ margin: "auto" }}><tbody>
                    <tr>
                        <th>Name</th>
                        <th>Volume Type</th>
                        <th>Arbiter</th>
                        <th>Brick Dirs</th>
                    </tr>
                    {volumeRows}
                </tbody></table>
            </form>
        )
    }
}

module.exports = WizardVolumesStep;