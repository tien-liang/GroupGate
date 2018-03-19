import React, { Component } from 'react'

export default class Course extends Component {
	constructor(props) {
		super(props)
		this.ESCAPE_KEY = 27;
		this.ENTER_KEY = 13;
		this.state = {
			adding: true,
			editing: true,
			addButtonDisabled: props.addButtonDisabled
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.cancel = this.cancel.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
	}

	componentDidUpdate() {
		var textArea
		if(this.state.editing) {
			textArea = this._newText
			textArea.focus()
			textArea.select()
		}
	}

	edit() {
		this.setState({
			editing: true,
			adding: false
		})
	}

	remove() {
		this.props.onRemove(this.props.index)
	}

	save(e) {
		e.preventDefault()
		this.props.onChange(this._newText.value, this.props.index)
		this.setState({
			editing: false
		})
	}

	cancel = (e) => {
		if(this.state.adding){					// fixes the difference between Editing new record and editing existing record
				this.remove()
		}

    this.setState({
			editing: false
		})
		this.props.onCancel( false )
	}

	renderForm() {
		return (
			<div className="note" style={this.style}>
				<form>
					{this.props.label_1}
					<input type="text" ref={input => this._newText = input}
							  defaultValue={this.props.children}/>
								{this.props.label_2}
								{this.props.value_2}
								{this.props.value_3}

					<button id="save" onClick={this.save}>save</button>
					<button id="cancel" onClick={this.cancel}>cancel</button>
				</form>
			</div>
		)
	}

	renderDisplay() {
		return (
			<div className="note" style={this.style}>
				<p> {this.props.label_1}{this.props.children}</p>
				{this.props.label_2}{this.props.value_2}{this.props.value_3}
				<span>
					<button onClick={this.edit} id="edit">edit</button>
					<button onClick={this.remove} id="remove">remove</button>
				</span>
			</div>
		)
	}
	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay()
	}
}
