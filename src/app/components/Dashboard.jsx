import React from 'react';
import GdeploySetup from '../components/GdeploySetup.jsx'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gdeployWizardShown: false
    };
    this.startGdeploy = this.startGdeploy.bind(this)
    this.onGdeployClose = this.onGdeployClose.bind(this)
  }
  startGdeploy() {
    this.setState({
      gdeployWizardShown: true
    })
  }
  onGdeployClose() {
    this.setState({
      gdeployWizardShown: false
    })
  }
  render() {
    return (
      <div>
      {this.state.gdeployWizardShown && <GdeploySetup onClose={this.onGdeployClose}/>}
      <div className="curtains curtains-ct blank-slate-pf">
        <div className="container-center">
          <div className="blank-slate-pf-icon"><i className="fa fa-database"></i></div>
          <h1>Deploy Gluster</h1>
          <p className="curtains-message">
            Gluster is not configured yet. Click Start to install and configure Gluster storage.
          </p>
          <div className="blank-slate-pf-main-action"><button className="btn btn-lg btn-primary" onClick={this.startGdeploy}>Start</button></div>
        </div>
      </div>
      </div>
    )
  }
}
