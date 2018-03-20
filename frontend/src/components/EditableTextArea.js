import React, { Component } from 'react'

export default class EditableTextArea extends Component {
    constructor(props){
        super(props)
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
        this.state = {
            editText: props.textAreaValue,
            editing: false
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.renderText = this.renderText.bind(this)
        this.renderInput = this.renderInput.bind(this)
    }

    componentDidUpdate() {
        var textArea
        if (this.state.editing) {
            textArea = this._newText
            textArea.focus()
            textArea.select()
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

    renderText() {                      // Render form, text disabled for editing
        return(
            <div className="editable-field">
                <p> {this.props.label} {this.props.value} </p>
                    <button id="edit" onClick={this.handleEdit}> edit </button>

            </div>
        )

    }

    renderInput() {                     // Render form, text enabled for editing
        return(
            <div className="input-field">
                <form onSubmit={this.handleSave}>
                    {this.props.label}
                    <textarea ref={ input => this._newText = input}
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
