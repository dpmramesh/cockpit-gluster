var React = require('react');
class HostRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<tr>
            <td style={{ width: "50%" }}>
                <input type="text" className="form-control" value={this.props.host} onChange={this.props.onChange}/>
            </td>
            <td style={{ width: "15%" }}>
                <button className="btn btn-primary" type="button" onClick={this.props.onAdd}>+</button>
                <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>-</button>
            </td>
        </tr>
        )
    }
}


class WizardHostStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hosts: props.hosts
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.updateHost = this.updateHost.bind(this);
        if(this.state.hosts.length == 0){
            this.handleAdd();
        }  
    }
    handleDelete(index) {
        let hosts = this.state.hosts
        hosts.splice(index, 1);
        if(hosts.length == 0){
            this.handleAdd();
        }else{this.setState({ hosts: hosts })}
    }
    handleAdd() {
        let hosts = this.state.hosts
        hosts.push("")
        this.setState({ hosts: hosts })
    }
    updateHost(index, e) {
        let hosts = this.state.hosts;
        hosts[index] = e.target.value
        this.setState({ hosts: hosts })
    }
    render() {
        let hostRows = [];
        let that = this
        this.state.hosts.forEach(function (host, index, hosts) {
            hostRows.push(<HostRow host={host} key={index} onDelete={() => that.handleDelete(index) } onChange={that.updateHost.bind(this, index) } onAdd={that.handleAdd}/>)
        })
        return (
            <form className="form-horizontal">
                <table style={{ margin: "auto"}}><tbody>
                    {hostRows}
                </tbody></table>
            </form>
        )
    }
}
export default WizardHostStep;