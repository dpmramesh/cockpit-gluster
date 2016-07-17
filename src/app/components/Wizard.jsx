import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Wizard extends Component {
    displayName: "Wizard"
    propTypes: {
        title: React.PropTypes.string.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            isFinished: false,
            isModalDialogOpen: true
        };
        this.moveNext = this.moveNext.bind(this)
        this.moveBack = this.moveBack.bind(this)
        this.cancel = this.cancel.bind(this)
        this.finish = this.finish.bind(this)
        this.moveToStep = this.moveToStep.bind(this)
    }
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).modal('show')
    }
    cancel() {
        this.setState(
            { isModalDialogOpen: false }
        )
    }
    moveBack() {
        if(this.state.activeStep > 0){
            this.setState(
                { activeStep: --this.state.activeStep }
            )
        }
    }
    moveNext() {
        if (this.state.activeStep < this.props.steps.length-1) {
            this.setState(
                { activeStep: ++this.state.activeStep }
            )
        }
    }
    finish() {
        this.props.onFinish()        
        this.setState(
            { isFinished: true }
        )
    }
    moveToStep(step){
        this.setState(
            { activeStep: step}
        )        
    }
    render() {
        var activeStep =  this.state.activeStep,
            steps = [],
            pages = [],
            activePage,
            backButtonStyle = "btn btn-default wizard-pf-back",
            nextButtonStyle = "btn btn-primary wizard-pf-next",
            finishButtonStyle = "btn btn-primary wizard-pf-finish",
            closeButtonStyle = "btn btn-primary wizard-pf-close wizard-pf-dismiss",
            hiddenStyle = {
                display: 'none'
            };
            
            
        if(!this.state.isModalDialogOpen){
            return null
        }
        //Create the Navigation steps with proper active step                  
        this.props.steps.forEach(function(step,index,allSteps){
            if(activeStep === index){
                steps.push(<li className="wizard-pf-step active" data-tabgroup={index} key={index}>
                    <a><span className="wizard-pf-step-number">{index+1}</span><span className="wizard-pf-step-title">{step}</span></a>
                </li>);
            }else{
                steps.push(<li className="wizard-pf-step" data-tabgroup={index} key={index} onClick={() => this.moveToStep(index)}>
                    <a><span className="wizard-pf-step-number">{index+1}</span><span className="wizard-pf-step-title">{step}</span></a>
                </li>);                
            }
        }, this)
        

        // Render the pages
        React.Children.forEach(this.props.children, function(page, idx) {
            if (idx == activeStep) {
                activePage = page;
                return;
            }
            pages.push(page);
        });
        
        // Enable/Disable the action buttons based on the active step.
        if(activeStep === 0){
            backButtonStyle += " disabled"
        }
        if(activeStep === this.props.steps.length-1){
            nextButtonStyle += " hidden"
            if(this.state.isFinished){
                finishButtonStyle += " hidden"
            }else{
                closeButtonStyle += " hidden"
            }
        }else{
            finishButtonStyle += " hidden"
            closeButtonStyle += " hidden"
        }
       return (
   <div className="modal in" id="complete" role="dialog" style={{display: "block"}}>
      <div className="modal-dialog modal-lg wizard-pf">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button"className="close wizard-pf-dismiss" aria-label="Close" onClick={this.cancel} data-dismiss="modal" aria-hidden="true">
              <span className="pficon pficon-close"></span></button>
            <dt className="modal-title">{this.props.title}</dt>
          </div>
          <div className="modal-body wizard-pf-body clearfix">
            <div className="wizard-pf-steps">
              <ul className="wizard-pf-steps-indicator">
              {steps}
              </ul>
            </div>
            <div className="wizard-pf-row" style={{top: "172px", bottom:"58px"}}>
             <div className="wizard-pf-main" style={{"marginLeft": "20px"}}>
                <div className="wizard-pf-contents">
                    { activePage }
                    <ol style={ hiddenStyle }>
                        { pages }
                    </ol>
                </div>             
             </div>
            </div>
            </div>
            <div className="modal-footer wizard-pf-footer">
                <button type="button" className="btn btn-default btn-cancel wizard-pf-cancel wizard-pf-dismiss" onClick={this.cancel} data-dismiss="modal" aria-hidden="true">Cancel</button>
                <button type="button" className={backButtonStyle} onClick={this.moveBack}>
                    <span className="i fa fa-angle-left" ></span>Back
                </button>
                <button type="button" className={nextButtonStyle} onClick={this.moveNext}>
                    Next
                    <span className="i fa fa-angle-right"></span>
                </button>
                <button type="button" className={finishButtonStyle} onClick={this.finish}>
                    Deploy<span className="i fa fa-angle-right"></span>
                </button>
                <button type="button" className={closeButtonStyle} onClick={this.cancel} data-dismiss="modal" aria-hidden="true">Close</button>
          </div>
        </div>
      </div>
    </div>
        )
    }
}

export default Wizard