import React, { Component } from 'react'
import Course from './Course'
import { Button } from "semantic-ui-react";

export default class CourseList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			courses: [],
			addButtonDisabled: false
		}
		this.add = this.add.bind(this)
		this.eachCourse = this.eachCourse.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.onCancel = this.onCancel.bind(this)
	}

	add(text) {
		var date = new Date();
		var semester = ''
		if ( (date.getMonth()+1) >= 1 && (date.getMonth()+1) <= 4   ){
			semester='Spring'
		} else if( (date.getMonth()+1) >= 5 && (date.getMonth()+1) <= 8 ) {
			semester = 'Summer'
		} else { semester = 'Fall' }

		this.setState(prevState => ({
			courses: [
				...prevState.courses,
				{
					id: this.nextId(),
					courseNumber: text,
					termYear: date.getFullYear(),
					termSemester: semester
				}
			],
		}))

		this.setState({ addButtonDisabled: true })
	}

	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	update(newText, i) {
		console.log('updating item at index', i, newText)
		this.setState(prevState => ({
			courses: prevState.courses.map(
				course => (course.id !== i) ? course : {...course, courseNumber: newText}
			)
		}))

		this.setState({ addButtonDisabled: false })
	}

	onCancel( newState ){
		this.setState({ addButtonDisabled: newState })
	}

	remove(id) {
		console.log('removing item at', id)																					// DEBUG
		this.setState(prevState => ({
			courses: prevState.courses.filter(course => course.id !== id)
		}))
	}

	eachCourse(course, i) {
		return (
			<Course key={course.id}
				  index={course.id} label_1='Course Number: ' label_2='Term: '
					value_2= {course.termYear} value_3= {course.termSemester}
					onCancel={this.onCancel} onChange={this.update} onRemove={this.remove}>
				  {course.courseNumber}
		  </Course>
		)
	}

	render() {
		return (
			<div className="board">
			<Button basic color="blue" onClick={this.add.bind(null,"")}id="add" disabled={this.state.addButtonDisabled}>+ Add Class</Button>
				{this.state.courses.map(this.eachCourse)}
			</div>
		)
	}
}
