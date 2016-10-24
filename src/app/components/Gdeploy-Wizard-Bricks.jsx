var React = require('react');

class BrickRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<tr>
            <td style={{ width: "25%" }}>
                <input type="text" className="form-control" value={this.props.brick.name} onChange={(e) => this.props.onUpdate(this.props.index, "name", e.target.value)} />
            </td>
            <td style={{ width: "25%" }}>
                <input type="text" className="form-control" value={this.props.brick.device} onChange={(e) => this.props.onUpdate(this.props.index, "device", e.target.value)} />
            </td>
            <td style={{ width: "25%" }}>
                <input type="text" className="form-control" value={this.props.brick.brick_dir} onChange={(e) => this.props.onUpdate(this.props.index, "brick_dir", e.target.value)} />
            </td>
            <td style={{ width: "15%" }}>
                <button className="btn btn-primary" type="button" onClick={this.props.onAdd}>+</button>
                <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>-</button>
            </td>
        </tr>
        )
    }
}

class WizardBricksStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: props.bricks
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        if (this.state.bricks.length === 0) {
            this.handleAdd();
        }
    }
    handleDelete(index) {
        let bricks = this.state.bricks
        bricks.splice(index, 1);
        if (bricks.length === 0) {
            bricks.push(this.getEmptyRow())
        }
        this.setState({ bricks: bricks })

    }
    getEmptyRow() {
        return { name: "", device: "", brick_dir: "" }
    }
    handleAdd() {
        let bricks = this.state.bricks
        bricks.push(this.getEmptyRow())
        this.setState({ bricks: bricks })
    }
    handleUpdate(index, property, value) {
        let bricks = this.state.bricks
        bricks[index][property] = value
        this.setState({ bricks: bricks })
    }
    render() {
        let bricksRow = [];
        this.state.bricks.forEach(function (brick, index, allBricks) {
            bricksRow.push(<BrickRow brick={brick} key={index} index={index} onUpdate={this.handleUpdate} onDelete={() => this.handleDelete(index)} onAdd={this.handleAdd} />)
        }, this)
        return (
            <form className="form-horizontal">
                <table style={{ margin: "auto" }}><tbody>
                    <tr>
                        <th>Name</th>
                        <th>Device</th>
                        <th>Brick Dirs</th>
                    </tr>
                    {bricksRow}
                </tbody></table>
            </form>
        )
    }
}

module.exports = WizardBricksStep;