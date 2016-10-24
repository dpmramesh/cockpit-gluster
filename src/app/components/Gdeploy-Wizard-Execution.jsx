var React = require('react');
const DeploymentSuccessPanel = ({callBack}) => {
  return (
      <div className="wizard-pf-complete blank-slate-pf">
        <div className="wizard-pf-success-icon"><span className="glyphicon glyphicon-ok-circle"></span></div>
        <h5 className="blank-slate-pf-main-action">Deployment was successful</h5>
        <p className="blank-slate-pf-secondary-action">Successfully deployed gluster</p>
        <button type="button" className="btn btn-lg btn-primary" onClick={callBack}>Continue to Hosted Engine Deployment</button>
      </div>
  )
}

const Status = ({status}) => {
    if (status === 0) {
        return (
            <div>
                <span className="glyphicon glyphicon-ok-circle"></span>
                <span>Deployment was successful</span>
            </div>
        )
    } else if (status === 2) {
        return (
            <div>
                <div className="spinner spinner-lg blank-slate-pf-icon"></div>
                <span>Deployment in progress</span>
            </div>
        )
    } else if (status === -1) {
        return (
            <div>
                <span className="pficon-error-circle-o"></span>
                <span>Deployment failed</span>
            </div>
        )
    } else {
        return (
            <div>
                <div className="spinner spinner-lg blank-slate-pf-icon"></div>
                <span>Deployment in progress</span>
            </div>
        )
    }
}

class WizardExecutionStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gdeployLog: "",
            gdeployStatus: 1
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.gdeployDone = this.gdeployDone.bind(this)
        this.gdeployStream = this.gdeployStream.bind(this)
        this.gdeployFail = this.gdeployFail.bind(this)
        this.runGdeploy = this.runGdeploy.bind(this)
    }
    componentDidMount() {
        window.setTimeout(this.gdeployDone, 1000)
    }

    gdeployDone() {
        this.setState({
            gdeployStatus: 0
        })
    }
    gdeployStream(data) {
        this.setState({
            gdeployLog: this.state.gdeployLog + data
        })
    }
    gdeployFail() {
        this.setState({
            gdeployStatus: -1
        })
    }
    runGdeploy() {
        //gdeploy -c /cockpit-gluster/src/gdeploy-templat.conf
        var gdeployProc = cockpit.spawn(["gdeploy", "-c", this.props.configFilePath]);
        gdeployProc.done(this.gdeployDone)
        gdeployProc.stream(this.gdeployStream)
        gdeployProc.fail(this.gdeployFail)
        this.setState({
            gdeployStatus: 2
        })
    }
    render() {
            if(this.state.gdeployStatus ===0){
               return <DeploymentSuccessPanel  callBack={this.props.onSuccess}/>
            }
            return(
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Status status={this.state.gdeployStatus} />
                    </div>
                    <div className="list-group">
                        <div className="list-group-item">
                            <textarea style={{ width: "100%", "minHeight": "225px" }} value={this.state.gdeployLog}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default WizardExecutionStep;