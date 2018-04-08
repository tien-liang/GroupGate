import React, { Component } from 'react'
import Course from './Course'
import { Button, Message } from "semantic-ui-react";
import auth from '../Auth'
import axios from 'axios';
const date = new Date();
const userId = auth.getUserInfo();
export default class CourseList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: "",
			courses: [],
			adding: false,
			addButtonDisabled: false,
			repeated_warning_hidden: true
		}
		this.add = this.add.bind(this)
		this.eachCourse = this.eachCourse.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.onCancel = this.onCancel.bind(this)
		this.getCurrentTermSemester = this.getCurrentTermSemester.bind(this)
		this.warning = this.warning.bind(this)
	}

	componentWillMount(){
		this.getUserInfo();
	}

	getUserInfo(){
		axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${userId}"}}}`)
			.then(response => {
				this.setState( {
					userId: response.data[0].id,
					}, () => {
					console.log('MP -> Loading user: ', this.state);
				})
				console.log(this.state.userId)
				axios.get(`http://localhost:3000/api/userinfos/${this.state.userId}/coursesTaken`)
				.then(response =>{
					console.log(response.data)
					this.setState({courses: response.data})
				}
				)
			})
	}

	getCurrentTermSemester(){
		return (  (date.getMonth()+1) >= 1 && ((date.getMonth()+1) <= 4 ) ? 'Spring' :
		( ((date.getMonth()+1) >= 5 && (date.getMonth()+1) <= 8 ) ? 'Summer' : 'Fall' ) )
	}

	add(text) {																																		// Add button clicked handler
		this.setState(prevState => ({
			courses: [
				...prevState.courses,
				{
					course_number: text,
					term_year: date.getFullYear(),
					term_semester: this.getCurrentTermSemester()
				}
			],
		}))
		this.setState({adding: true})
		this.setState({ addButtonDisabled: true })
	}

	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	update( newText, i, addMode ) {
		console.log('updating item at index: ', i, newText)
		// const dataPackage = newText;

		if ( addMode ){
			axios.request({																														//Add course
				method:'post',
				url:`http://localhost:3000/api/userinfos/${this.state.userId}/coursesTaken`,
				data: {
					course_number: newText,
					term_year: String(date.getFullYear()),
					term_semester: this.getCurrentTermSemester(),
				}
			}).then(response => {
				console.log(response )
			}).catch(err => console.log(err));

		}else {
			axios.request({																														// update course
				method:'patch',
				url:`http://localhost:3000/api/courseinfos/${i}`,
				data: { course_number: newText }
			}).then(response => {
				console.log(response)
			}).catch(err => console.log(err));
		}

		this.setState(prevState => ({
			courses: prevState.courses.map(
				course => (course.id !== i) ? course : {...course, course_number: newText,
					term_year: date.getFullYear(),
					term_semester: this.getCurrentTermSemester()  }
				)
			}))

			this.setState({ addButtonDisabled: false })

		}

		onCancel( newState ){
			this.setState({ addButtonDisabled: newState })
		}

		remove(id) {
			console.log('removing item at', id)																					// DEBUG
			axios.delete(`http://localhost:3000/api/courseinfos/${id}`)
			.then(response => {
				this.setState( {
				}, () => {
					console.log('MP -> Loading user: ', this.state);
				})
			})

			this.setState(prevState => ({
				courses: prevState.courses.filter(course => course.id !== id)
			}))
		}
		warning(){
			this.setState({repeated_warning_hidden: false})
			setTimeout(function() { this.setState({repeated_warning_hidden: true}); }.bind(this), 4000);
		}
		eachCourse(course, i) {
			console.log ('CL -> checking course at eachCourse: ', course.course_number, '  ', course.id, i)									// DEBUG
			return (
				<Course key={course.id}
					index={course.id} label_1='Course Number: ' label_2='Term: '
					value_2= {course.term_year} value_3= {course.term_semester} adding={this.state.adding}
					onCancel={this.onCancel} onChange={this.update} onRemove={this.remove} userId={this.state.userId} warning={this.warning}>
					{course.course_number}
				</Course>
			)
		}

		render() {
			return (
				<div className="panel-group">
					<Button id="add" basic color="blue" onClick={this.add.bind(null,"")}
						disabled={this.state.addButtonDisabled}>+ Add Course</Button>
						{this.state.courses.map(this.eachCourse)}
						<Message negative hidden={this.state.repeated_warning_hidden}>
							<Message.Header>Course already existed!</Message.Header>
						</Message>
					</div>
				)
			}
		}
