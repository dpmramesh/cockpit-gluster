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
                hosts: ["10.70.42.153", "10.70.42.62", "10.70.42.56"],
                repos: "http://resources.ovirt.org/pub/ovirt-master-snapshot-static/rpm/el7Server/,http://resources.ovirt.org/pub/ovirt-master-snapshot/rpm/el7Server/,http://mirror.centos.org/centos/7/storage/x86_64/gluster-3.8/,https://download.gluster.org/pub/gluster/glusterfs-nagios/1.1.0/CentOS/epel-7Server/,https://dl.fedoraproject.org/pub/epel/7/x86_64/,http://cbs.centos.org/repos/virt7-ovirt-41-candidate/x86_64/os/",
                packages: "vdsm,vdsm-gluster,ovirt-hosted-engine-setup,screen,gluster-nagios-addons,xauth,ntp",
                volumes : [{name:"engine", type:"replicate", brick_dir:"/gluster-bricks/engine/engine", is_arbiter:true},
                          {name:"vmstore", type:"replicate", brick_dir:"/gluster-bricks/vmstore/vmstore", is_arbiter:true},
                          {name:"data", type:"replicate", brick_dir:"/gluster-bricks/data/data", is_arbiter:true}
                         ],
                bricks : [{name:"engine", device:"/dev/vdb", brick_dir:"/gluster-bricks/engine", size:"100GB", thinp:false, raid_type:"raid6", stripe_size:"256 KB", disk_count:"12"},
                          {name:"vmstore", device:"/dev/vdb", brick_dir:"/gluster-bricks/vmstore", size:"100GB", thinp:false, raid_type:"raid6", stripe_size:"256 KB", disk_count:"12"},
                          {name:"data", device:"/dev/vdb", brick_dir:"/gluster-bricks/data", size:"100GB", thinp:false, raid_type:"raid6", stripe_size:"256 KB", disk_count:"12"}
                         ],
                raid_param : { raid_type: "raid6", disk_count: 6, stripe_size: 256}
            },
            isDeploymentStarted: false
        };
        this.handleFinish = this.handleFinish.bind(this)
    }
    handleFinish() {
        this.setState(
            {isDeploymentStarted: true}
        )
    }
    render() {
        var steps = ['Hosts', 'Packages', 'Volumes', 'Bricks', 'Review'];
        return(
            <Wizard title="Gluster Deployment" onClose={this.props.onClose} steps={steps} onFinish={this.handleFinish}>
                <WizardHostStep hosts={this.state.glusterModel.hosts} onupdateHosts={this.handleUpdateHosts}/>
                <WizardPackageStep additionalRepos={this.state.glusterModel.repos} additionalPackages={this.state.glusterModel.packages} onUpdatePackages={this.handleUpdatePackages}/>
                <WizardVolumesStep volumes={this.state.glusterModel.volumes}/>
                <WizardBricksStep bricks={this.state.glusterModel.bricks}/>
                <WizardPreviewStep glusterModel={this.state.glusterModel} configFilePath='/tmp/gdeployConfig.conf' templatePath='/cockpit-gluster/src/gdeploy-templat.conf' onSuccess={this.props.onSuccess} isDeploymentStarted={this.state.isDeploymentStarted}/>
            </Wizard>
        )
    }
}

export default GdeploySetup