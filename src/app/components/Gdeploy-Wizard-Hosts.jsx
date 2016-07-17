var React = require('react');

class WizardHostStep extends React.Component {
      
   constructor(props) {
        super(props);
        this.state = {
            host1: props.hosts[0],
            host2: props.hosts[1],
            host3: props.hosts[2],
        }
        this.updateHost1 = this.updateHost1.bind(this)
        this.updateHost2 = this.updateHost2.bind(this)
        this.updateHost3 = this.updateHost3.bind(this)
        this.updateHosts = this.updateHosts.bind(this)
    }
    updateHost1(e){
        this.setState({
            host1: e.target.value
        })
        this.props.onupdateHosts([ e.target.value, this.state.host2, this.state.host3])
    }
    updateHost2(e){
        this.setState({
            host2: e.target.value
        })
        this.props.onupdateHosts([ this.state.host1, e.target.value, this.state.host3])     
    }
    updateHost3(e){
        this.setState({
            host3: e.target.value
        })
        this.props.onupdateHosts([ this.state.host1, this.state.host2, e.target.value])          
    }
    updateHosts(){
        this.props.onupdateHosts([ this.state.host1, this.state.host2, this.state.host3])
    }
    
render() {
    return (
                <form className="form-horizontal">
                    <div className="form-group">
                    <label className="col-md-2 control-label">Host1</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={this.state.host1} onChange={this.updateHost1}/>
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-2 control-label">Host2</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={this.state.host2}onChange={this.updateHost2}/>
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-2 control-label">Host3</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={this.state.host3} onChange={this.updateHost3}/>
                        </div>
                    </div>                                        
                </form>
    )
}
}
export default WizardHostStep;