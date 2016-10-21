var React = require('react');

class WizardExecutionStep extends React.Component {
constructor(props) {
        super(props);
        this.state = {
            gdeployLog: "",
            gdeployStatus: "Not Started"
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.gdeployDone = this.gdeployDone.bind(this)
        this.gdeployStream = this.gdeployStream.bind(this)
        this.gdeployFail = this.gdeployFail.bind(this)
        this.runGdeploy = this.runGdeploy.bind(this)
    }
componentDidMount() {
   this.runGdeploy()
}

gdeployDone(){
    this.setState({
        gdeployStatus: "Done"
    })
}
gdeployStream(data){
    this.setState({
        gdeployLog: this.state.gdeployLog+data
    })
}
gdeployFail(){
    this.setState({
        gdeployStatus: "Failed"
    })
}
runGdeploy() {
    //gdeploy -c /cockpit-gluster/src/gdeploy-templat.conf
    var gdeployConfigFile = '/cockpit-gluster/src/gdeploy-templat.conf'
    var gdeployProc = cockpit.spawn(["gdeploy", "-c", gdeployConfigFile]);
    gdeployProc.done(this.gdeployDone)
    gdeployProc.stream(this.gdeployStream)
    gdeployProc.fail(this.gdeployFail)
    this.setState({
            gdeployStatus: "In Progress"
        })
}
render() {
    return (
            <div className="col-sm-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Gdeploy Status</label>
                        <label className="col-md-2 control-label">{this.state.gdeployStatus}</label>
                    </div>
                </form>
                <h2> Gdeploy execution log</h2>
                <textarea style={{ width: "100%", "min-height": "300px"}} value={this.state.gdeployLog}></textarea>
        </div>
    )
}
}
export default WizardExecutionStep;