var React = require('react');

class WizardPreviewStep extends React.Component {
      
   constructor(props) {
        super(props);
        this.state = {
        }
}
render() {
    return (
            <div className="col-sm-12">
            <h2> Generated Cofig Files</h2>
            <textarea value={this.props.gdeployConfig}></textarea>
        </div>
    )
}
}
export default WizardPreviewStep;