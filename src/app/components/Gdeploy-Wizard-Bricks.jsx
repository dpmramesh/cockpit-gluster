var React = require('react');
var PropTypes = React.PropTypes;
var WizardBricksStep = function (props) {
    return (
        <div className="jumbotron col-sm-6 col-sm-offset-3 text-center">
            <h1>Bricks</h1>
            <div className="col-sm-12">
                <form>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Volume-1"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Volume-2"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

module.exports = WizardBricksStep;