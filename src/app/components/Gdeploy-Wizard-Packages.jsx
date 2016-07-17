var React = require('react');

class WizardPackageStep extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            additionalRepos: props.additionalRepos,
            additionalPackages: props.additionalPackages
        }
        this.updateAdditionalRepos = this.updateAdditionalRepos.bind(this)
        this.updateAdditionalPackages = this.updateAdditionalPackages.bind(this)
    }
    updateAdditionalRepos(e){
        this.setState({
            additionalRepos: e.target.value
        })
        this.props.onUpdatePackages(e.target.value, this.state.additionalPackages)
    }
    updateAdditionalPackages(e){
        this.setState({
            additionalPackages: e.target.value
        })
        this.props.onUpdatePackages(this.state.additionalRepos, e.target.value)     
    }
    
render() {
    return (
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Repos</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={this.state.additionalRepos} onChange={this.updateAdditionalRepos}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Packages</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={this.state.additionalPackages}onChange={this.updateAdditionalPackages}/>
                        </div>
                    </div>
                </form>
    )
}
}
export default WizardPackageStep;
