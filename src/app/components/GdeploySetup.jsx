import React, { Component } from 'react'
import WizardHostStep from './Gdeploy-Wizard-Hosts.jsx'
import WizardPackageStep from './Gdeploy-Wizard-Packages.jsx'
import WizardVolumesStep from './Gdeploy-Wizard-Volumes.jsx'
import WizardBricksStep from './Gdeploy-Wizard-Bricks.jsx'
import WizardPreviewStep from './Gdeploy-Wizard-Preview.jsx'
import WizardExecutionStep from './Gdeploy-Wizard-Execution.jsx'
var gdeployConfigUtil = require('../utils/gdeployConfigUtil');
import Wizard from './Wizard.jsx'

class GdeploySetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hosts: ["", "", ""],
            additionalRepos: "",
            additionalPackages: "",
            gdeployConfig: ""
        };
        this.handleUpdateHosts = this.handleUpdateHosts.bind(this)
        this.handleUpdatePackages = this.handleUpdatePackages.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
    }
    handleUpdateHosts(hosts){
        this.setState(
            {hosts: hosts}
        )
    }
    handleUpdatePackages(additionalRepos, additionalPackages){
        this.setState({
            additionalRepos: additionalRepos,
            additionalPackages: additionalPackages
        })
    }
    handleFinish() {
         var gdeployConfig = gdeployConfigUtil.createGdeployConfig(glusterModel, '/tmp/gdeployConfig.conf')
         this.setState(
             {gdeployConfig: gdeployConfig}
         )
         //TODO - Need to create answers file hosted-engine deployment
         //TODO - Start gdeploy execution immediatly after the config file creation
    }
    render() {
        var steps = ['Hosts', 'Packages', 'Volumes', 'Bricks', 'Review'];
        return(
            <Wizard title="Gluster Deployment using Gdeploy" steps={steps} onFinish={this.handleFinish}>
                <WizardHostStep hosts={this.state.hosts} onupdateHosts={this.handleUpdateHosts}/>
                <WizardPackageStep additionalRepos={this.state.additionalRepos} additionalPackages={this.state.additionalPackages} onUpdatePackages={this.handleUpdatePackages}/>
                <WizardVolumesStep/>
                <WizardBricksStep/>
                <WizardPreviewStep gdeployConfig={this.state.gdeployConfig}/>
            </Wizard>
        )
    }
}

export default GdeploySetup