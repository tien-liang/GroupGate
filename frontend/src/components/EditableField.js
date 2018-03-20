import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

export default class EditableField extends Component {
    constructor(props){
        super(props)
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
        this.state = {
            editText: props.inputValue,
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
        this.props.onChange(this._newText.value)
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
                <p> {this.props.label} {this.props.value} </p>
                    <button id="edit" onClick={this.handleEdit}>edit</button>
            </div>
        )
    }

    renderInput() {         // Render form with the field,  enabled for editing
        return(
            <div className="input-field">
                <form onSubmit={this.handleSave}>
                    {this.props.label}
                    <input type="text" ref={ input => this._newText = input}
                        defaultValue={this.props.value}/>
                    <span>
                        <button id="save" onClick={this.handleSave}>save</button>
                        <button id="cancel" onClick={this.handleCancel}>cancel</button>
                    </span>
                </form>
            </div>
        )
    }

    render() {
         return this.state.editing ? this.renderInput() : this.renderText()
    }
}
