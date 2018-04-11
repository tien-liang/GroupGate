import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

export default class EditableField extends Component {
    constructor(props){
        super(props)
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
        this.state = {
            editing: false
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.renderText = this.renderText.bind(this)
        this.renderInput = this.renderInput.bind(this)
    }

    componentDidUpdate() {
        var input
        if (this.state.editing) {
            input = this._newText
            input.focus()
            input.select()
        }
    }

    handleEdit() {
        this.setState({
            editing: true
        })
    }

    handleSave(e) {
        e.preventDefault()
        this.props.onChange('1', this._newText.value)
        this.setState({
              editing: false,
        });
    }

    handleCancel() {
        this.setState({
            editing: false
        })
    }

    renderText() {          // Render form with the field, disabled for editing
        return(
            <div className="editable-field">
              <div className="ui clearing container">
                <p className="left floated"> {this.props.label} {this.props.value} </p>
                <button className="ui primary button right floated" id="edit" onClick={this.handleEdit}>Edit</button>
              </div>
            </div>
        )
    }

    renderInput() {         // Render form with the field,  enabled for editing
        return(
            <div className="input-field">
                <form onSubmit={this.handleSave} className="ui form">
                  <div className="ui clearing container">
                    {this.props.label}
                    <div className="eight wide field">
                    <input type="text" ref={ input => this._newText = input}
                        defaultValue={this.props.value}/>
                    </div>
                    <span>
                      <button className="ui primary button right floated" id="save" onClick={this.handleSave}>Save</button>
                      <button className="ui red button right floated" id="cancel" onClick={this.handleCancel}>Cancel</button>
                    </span>
                  </div>
                </form>
            </div>
        )
    }

    render() {
         return this.state.editing ? this.renderInput() : this.renderText()
    }
}
