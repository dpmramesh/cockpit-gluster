import React, { Component } from 'react'
import WizardHostStep from './Gdeploy-Wizard-Hosts.jsx'
import WizardPackageStep from './Gdeploy-Wizard-Packages.jsx'
import WizardVolumesStep from './Gdeploy-Wizard-Volumes.jsx'
import WizardBricksStep from './Gdeploy-Wizard-Bricks.jsx'
import WizardPreviewStep from './Gdeploy-Wizard-Preview.jsx'
var gdeployConfigUtil = require('../utils/gdeployConfigUtil');
import Wizard from './Wizard.jsx'

class GdeploySetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glusterModel: {
                hosts: ["10.70.41.161", "10.70.41.245", "10.70.43.128"],
                repos: "http://resources.ovirt.org/pub/ovirt-master-snapshot-static/rpm/el7Server/,http://resources.ovirt.org/pub/ovirt-master-snapshot/rpm/el7Server/,http://mirror.centos.org/centos/7/storage/x86_64/gluster-3.8/",
                packages: "vdsm,vdsm-gluster,ovirt-hosted-engine-setup,screen,gluster-nagios-addons,xauth",
            },
            isDeploymentStarted: false
        };
        this.handleUpdateHosts = this.handleUpdateHosts.bind(this)
        this.handleUpdatePackages = this.handleUpdatePackages.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
    }
    handleUpdateHosts(hosts){
        var glusterModel = this.state.glusterModel
        glusterModel.hosts = hosts
        this.setState(
            {glusterModel: glusterModel}
        )
    }
    handleUpdatePackages(additionalRepos, additionalPackages){
        var glusterModel = this.state.glusterModel
        glusterModel.repos = additionalRepos
        glusterModel.packages = additionalPackages
        this.setState(
            {glusterModel: glusterModel}
        )
    }
    handleFinish() {
        this.setState(
            {isDeploymentStarted: true}
        )
    }
    render() {
        var steps = ['Hosts', 'Packages', 'Volumes', 'Bricks', 'Review'];
        return(
            <Wizard title="Gluster Deployment using Gdeploy" onClose={this.props.onClose} steps={steps} onFinish={this.handleFinish}>
                <WizardHostStep hosts={this.state.glusterModel.hosts} onupdateHosts={this.handleUpdateHosts}/>
                <WizardPackageStep additionalRepos={this.state.glusterModel.repos} additionalPackages={this.state.glusterModel.packages} onUpdatePackages={this.handleUpdatePackages}/>
                <WizardVolumesStep/>
                <WizardBricksStep/>
                <WizardPreviewStep glusterModel={this.state.glusterModel} isDeploymentStarted={this.state.isDeploymentStarted}/>
            </Wizard>
        )
    }
}

export default GdeploySetup