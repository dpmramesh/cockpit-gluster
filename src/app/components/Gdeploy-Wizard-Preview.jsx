var React = require('react');
var ini = require('ini');
import WizardExecutionStep from './Gdeploy-Wizard-Execution.jsx'
var gdeployConfigUtil = require('../utils/gdeployConfigUtil');

class WizardPreviewStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gdeployConfig: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.createGdeployConfig = this.createGdeployConfig.bind(this)
    }

    createGdeployConfig(templatePath, gdeployModel, configFilePath) {
        var that = this
        gdeployConfigUtil.readIniFile(templatePath).done(function (template) {
            if (template != null) {
                var configTemplate = ini.parse(template)
                var gdeployConfig = gdeployConfigUtil.createGdeployConfig(gdeployModel, configTemplate, configFilePath)
                //TODO - Need to create answers file hosted-engine deployment
                that.setState({ gdeployConfig: gdeployConfig })
            }
        })
    }

    componentDidMount() {
        this.createGdeployConfig(this.props.templatePath, this.props.glusterModel, this.props.configFilePath);
    }

    render() {
        if (this.props.isDeploymentStarted) {
            return <WizardExecutionStep configFilePath={this.props.configFilePath} onSuccess={this.props.onSuccess} />
        } else {
            return (
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span className="pficon-settings"></span>
                            <span>Generated Gdeploy configuration : {this.props.configFilePath}</span>
                        </div>
                        <textarea style={{ width: "100%", "minHeight": "225px" }} value={this.state.gdeployConfig}></textarea>
                    </div>
                </div>
            )
        }
    }
}
export default WizardPreviewStep;