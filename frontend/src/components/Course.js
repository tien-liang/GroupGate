import React, { Component } from 'react'
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/courseinfos`;
export default class Course extends Component {
	constructor(props) {
		super(props)
		this.ESCAPE_KEY = 27;
		this.ENTER_KEY = 13;
		this.state = {
			adding: props.adding,																						// false =
			editing: false,
			user_courses: [],																						// true = editing form, false = display text only
			addButtonDisabled: props.addButtonDisabled
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.cancel = this.cancel.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
	}

	componentDidMount(){
		this.getCourses();
	}

	getCourses(){
		var arr = [];																															// API call to load courses
		axios.get(`${url}?filter={"where":{"user_id":{"like":"${this.props.userId}"}}} `)
		.then(response => {
			response.data.map((course)=>{arr.push(course.course_number)})
			this.setState({user_courses: arr})
		})
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
		if (!this.state.user_courses.includes(this._newText.value)){
			this.props.onChange(this._newText.value, this.props.index, this.state.adding )
		}else{
			this.props.warning();
			if(this.state.adding){					// fixes the difference between Editing new record and editing existing record
				this.remove()
			}
		}
		this.setState({
			editing: false
		})
		this.setState({adding: false})
		this.props.onCancel( false )
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
			<div className="ui clearing segment">
				<form className="ui form">
					{this.props.label_1}
					<div className="five wide field">
						<input type="text" ref={input => this._newText = input}
							defaultValue={this.props.children}/>
						</div>
						{this.props.label_2}
						{this.props.value_3}
						{" "}
						{this.props.value_2}
						<button className="ui primary button right floated" id="save" onClick={this.save}>Save</button>
						<button className="ui red button right floated" id="cancel" onClick={this.cancel}>Cancel</button>
					</form>
				</div>
			)
		}

		renderDisplay() {
			return (
				<table className="ui single line basic table">
					<thead>
						<tr>
							<th className="three wide">{"Course Number"}</th>
							<th>{"Term"}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{this.props.children}</td>
							<td>{this.props.value_2}{" "}{this.props.value_3}</td>
						</tr>
						<tr>
							<td colSpan="2">
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
			return this.state.editing || this.state.adding ? this.renderForm() : this.renderDisplay()
		}
	}
