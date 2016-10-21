var React = require('react');
import WizardExecutionStep from './Gdeploy-Wizard-Execution.jsx'
var gdeployConfigUtil = require('../utils/gdeployConfigUtil');

class WizardPreviewStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gdeployConfig: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        var glusterModel = this.props.glusterModel
        var gdeployConfig = gdeployConfigUtil.createGdeployConfig(glusterModel, '/tmp/gdeployConfig.conf')
        //TODO - Need to create answers file hosted-engine deployment
        //TODO - Start gdeploy execution immediatly after the config file creation
        this.setState(
            { gdeployConfig: gdeployConfig }
        )
    }
    render() {
        if (this.props.isDeploymentStarted) {
            return <WizardExecutionStep/>
        } else {
            return (
                <div className="col-sm-12">
                    <h2> Generated Cofig Files</h2>
                    <textarea style={{ width: "100%", "min-height": "300px" }} value={this.state.gdeployConfig}></textarea>
                </div>
            )
        }
    }
}
export default WizardPreviewStep;