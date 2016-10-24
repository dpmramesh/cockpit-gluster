import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Selectbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected :this.props.selected
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(selectedOption){
        this.setState({selected: selectedOption})
        this.props.onChange(selectedOption)
    }
    render() {
        let options = []
        let selected = null
        this.props.optionList.forEach(function (option, index) {
            options.push(<li value={option.key} key={option.key} onClick={this.handleClick.bind(this, option.key) }><a>{option.title}</a></li>)
            if(option.key === this.state.selected){
                selected = option
            }
        }, this)
        return (
            <div className="btn-group bootstrap-select dropdown form-control">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    <span className="pull-left">{selected.title}</span>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    }
}

export default Selectbox