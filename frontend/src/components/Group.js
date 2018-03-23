import React, { Component } from 'react'

export default class Group extends Component {
	constructor(props) {
		super(props)
		this.ESCAPE_KEY = 27;
		this.ENTER_KEY = 13;
		this.state = {
			select_value: this.props.status,
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
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidUpdate() {
		var textArea
		if(this.state.editing) {
			textArea = this._newGroupName
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
		this.props.onChange(this._newGroupName.value, this._newCourseNumber.value, this._newStatus.value, this._newDescription.value, this.props.index)
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

	handleChange(e){
		this.setState({select_value: e.target.value})
	}
//Edit Form Render
	renderForm() {
		return (
			<div className="ui clearing segment">
			<div className="note" style={this.style}>
				<form className="ui form">

					{"Group Name:"}
					<div className="five wide field">
					<input type="text" ref={input => this._newGroupName = input}
							  defaultValue={this.props.groupName}/>
					</div>

  					{"Course Number:"}
  					<div className="five wide field">
  					<input type="text" ref={input => this._newCourseNumber = input}
  							  defaultValue={this.props.courseNumber}/>
  					</div>

    					{"Status:"}
    					<div className="five wide field">
							<select value={this.state.select_value} ref={input=> this._newStatus = input} onChange={this.handleChange}>
								<option value="Open">Open</option>
								<option value="Closed">Closed</option>
							</select>
    					</div>

      					{"Description:"}
      					<div className="five wide field">
      					<input type="text" ref={input => this._newDescription = input}
      							  defaultValue={this.props.description}/>
      					</div>
					<button className="ui primary button right floated" id="save" onClick={this.save}>Save</button>
					<button className="ui red button right floated" id="cancel" onClick={this.cancel}>Cancel</button>
				</form>
			</div>
			</div>
		)
	}
//Normal Render
	renderDisplay() {
		return (
      <table className="ui single line basic table">
        <thead>
          <tr>
            <th className="two wide">{"Group Name"}</th>
            <th className="two wide">{"Course Number"}</th>
            <th className="two wide">{"Status"}</th>
            <th>{"Description"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.groupName}</td>
            <td>{this.props.courseNumber}</td>
            <td>{this.props.status}</td>
            <td>{this.props.description}</td>
          </tr>
          <tr>
            <td colSpan="4">
				<span>
					<button className="ui primary button right floated" onClick={this.edit} id="edit">Edit</button>
					<button  className="ui red button right floated" onClick={this.remove} id="remove">Remove</button>
				</span>
      </td>
    </tr>
      </tbody>
    </table>
		)
	}
	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay()
	}
}
