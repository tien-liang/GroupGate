import React, { Component } from 'react'
import Group from './Group'
import { Button, Message } from "semantic-ui-react";
import axios from 'axios';
import auth from '../Auth'
const userId = auth.getUserInfo();

export default class ProjectGroup extends Component {
	constructor(props){
		super(props);
		this.state = {
			userId: "",
			adding: false,
			courses: [],
			groups: [],
			addButtonDisabled: false,
			repeated_warning_hidden: true
		}
		this.add = this.add.bind(this)
		this.eachGroup = this.eachGroup.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.onCancel = this.onCancel.bind(this)
		this.myGroupsButton = this.myGroupsButton.bind(this)
		this.warning = this.warning.bind(this)
	}

	componentDidMount() {
		this.getUserInfo();
	}

	getUserInfo(){
		axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${this.props.userId}"}}}`)
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
			axios.get(`http://localhost:3000/api/userinfos/${this.state.userId}/groupinfos`)
			.then(response =>{
				console.log(response.data)
				this.setState({groups: response.data})
			})
	})
}

add(text) {
	this.setState(prevState => ({
		groups: [
			...prevState.groups,
			{
				group_name: text,
				group_status: "Open",
				group_descr: text,
				course_number: text
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

update(newGroupName, newCourseNumber, newStatus, newDescription, i, addMode) {
	console.log('GL -> Add mode: ', addMode)																	// DEBUG, REMOVE
	var courseId = this.state.courses.find((course)=>{return course.course_number === newCourseNumber}).id;
	if ( addMode ){
		axios.request({																														//Add group
			method:'post',
			url:`http://localhost:3000/api/userinfos/${this.state.userId}/groupinfos`,
			data: {
				group_name: newGroupName,
				group_descr: newDescription,
				group_course: newCourseNumber
			}
		}).then(response => {
			console.log( response )
		}).catch(err => console.log(err));
	}else {
		axios.request({																														// update group
			method:'patch',
			url:`http://localhost:3000/api/groupinfos/${i}`,
			data: {
				group_name: newGroupName,
				group_descr: newDescription,
				group_status: newStatus,
				group_course: newCourseNumber																		// items will need to be udpated when adding/removing members enabled
			}
		}).then(response => {
			console.log(response)
		}).catch(err => console.log(err));
	}

	this.setState(prevState => ({
		groups: prevState.groups.map(
			group => (group.id !== i) ? group : {...group, group_name: newGroupName, group_course: newCourseNumber, group_status: newStatus, group_descr: newDescription}
		)
	}))

	this.setState({ addButtonDisabled: false })
}

onCancel( newState ){
	this.setState({ addButtonDisabled: newState })
}

remove(id) {
	console.log('removing item at', id)																					// DEBUG
	axios.delete(`http://localhost:3000/api/groupinfos/${id}`)
	.then(response => {
		this.setState( {
		}, () => {
			console.log('MP -> Loading user: ', this.state);
		})
	})

	this.setState(prevState => ({
		groups: prevState.groups.filter(group => group.id !== id)
	}))
}
warning(){
	this.setState({repeated_warning_hidden: false})
	setTimeout(function() { this.setState({repeated_warning_hidden: true}); }.bind(this), 4000);
}
eachGroup(group, i) {
	console.log("GL -> goup members at i: ", i,  group.group_members)
	return (
		<Group key={group.id}
			index={group.id} groupName={group.group_name} courseNumber={group.group_course} status={group.group_status}
			description= {group.group_descr} members={group.group_members} adding={this.state.adding}
			onCancel={this.onCancel} onChange={this.update} onRemove={this.remove} userId={this.state.userId} myGroups={this.props.myGroups} warning={this.warning}>
		</Group>
	)
}

myGroupsButton(){
	if( this.props.myGroups ){
		return (
			<span>
				<Button basic color="blue" onClick={this.add.bind(null,"")} id="add"
					disabled={this.state.addButtonDisabled}>+ New Group</Button>
				</span>
			)
		}
	}

	render() {
		return (

			<div className="board">
				{this.myGroupsButton()}
				{this.state.groups.map(this.eachGroup)}
				<Message negative hidden={this.state.repeated_warning_hidden}>
					<Message.Header>Course already existed!</Message.Header>
				</Message>
			</div>
		)
	}
}
