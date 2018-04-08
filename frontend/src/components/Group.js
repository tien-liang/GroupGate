import React, { Component } from 'react'
import axios from 'axios';
import { Dropdown, Icon, Button, Card, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom';


export default class Group extends Component {
	constructor(props) {
		super(props)
		this.ESCAPE_KEY = 27;
		this.ENTER_KEY = 13;
		this.state = {
			select_value: this.props.status,
			selected_course: this.props.courseNumber,
			adding: props.adding,
			editing: false,
			user_courses_with_group: [],
			coursesOptions: [],
			groups: [],
			group_members: [],
			addButtonDisabled: props.addButtonDisabled
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.cancel = this.cancel.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.displayButtons = this.displayButtons.bind(this)
		this.getCourses = this.getCourses.bind(this)
		this.CourseshandleChange = this.CourseshandleChange.bind(this)
		this.getGroupMembers = this.getGroupMembers.bind(this)
		this.groupStatus = this.groupStatus.bind(this)
	}
	componentDidMount(){
		this.getCourses();
		this.getGroupMembers();
	}
	getGroups(){
		axios.get(`http://localhost:3000/api/userinfos/${this.props.userId}/groupinfos`)
		.then(response => {
			response.data.map((course)=>{this.setState({groups: response.data})})
		})
	}
	getCourses(){
		var arr = [];
		var options = [];																														// API call to load courses
		axios.get(`http://localhost:3000/api/userinfos/${this.props.userId}/coursesTaken`)
		.then(response => {
			response.data.map((course)=>{options.push({ key: course.course_number, text: course.course_number, value: course.course_number });})
			this.setState({coursesOptions: options})
			console.log(options)
		})
		axios.get(`http://localhost:3000/api/userinfos/${this.props.userId}/groupinfos`)
		.then(response => {
			response.data.map((group)=>{arr.push(group.group_course)})
			this.setState({user_courses_with_group: arr})
		})
	}
	getGroupMembers(){
		axios.get(`http://localhost:3000/api/groupinfos/${this.props.index}/userinfos`)
		.then(response => {
			this.setState({group_members: response.data})
		})
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
		console.log(this.state.user_courses_with_group)
		if (!this.state.user_courses_with_group.includes(this.state.selected_course)|!this.state.adding){
			this.props.onChange(this._newGroupName.value, this.state.selected_course,
				this._newStatus.value, this._newDescription.value,
				this.props.index, this.state.adding)
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

		handleChange(e){
			this.setState({select_value: e.target.value})
		}
		CourseshandleChange(e,value){
			this.setState({selected_course: value.value})
		}
		groupStatus(){
			if (this.props.status === "Open"){
				return (
					<div>
						<Icon name='check circle' />
						Open</div>)
					}else{
						return (
							<div>
								<Icon name='remove circle' />
								Closed</div>)
							}
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

												{"Course:"}
												<div className="five wide field">
													<Dropdown search selection placeholder='Courses' defaultValue={this.state.selected_course} options={this.state.coursesOptions} onChange={this.CourseshandleChange}/>
												</div>

												{"Status:"}
												<div className="five wide field">
													<select value={this.state.select_value} ref={input=> this._newStatus = input} onChange={this.handleChange}>
														<option value="Open">Open</option>
														<option value="Closed">Closed</option>
													</select>
												</div>

												{"Description:"}
												<div className="ten wide field">
													<textarea ref={input => this._newDescription = input}
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


								displayButtons(){

										return (
											<Card.Content extra>
												<div className='ui two buttons'>
													<Button basic color='red' onClick={this.remove}>Leave</Button>
												</div>
											</Card.Content>
										)
								}


								renderDisplay() {



									return (
										<Card>
											<Card.Content header={this.props.groupName} />
											<Card.Meta></Card.Meta>
											<Card.Content>
												Course: {this.props.courseNumber}<br/>
												Status: {this.props.status}<br/>
												Members: {this.state.group_members.map((member)=>{return (<Label horizontal key={member.id}><Link to={`/otherUsers/${member.id}`} >{member.display_name}</Link></Label>)})}<br/>
												Description: {this.props.description}<br/>
											</Card.Content>
											{this.displayButtons()}
										</Card>
									)
								}
								render() {
									return this.state.editing || this.state.adding ? this.renderForm() : this.renderDisplay()
								}
							}
