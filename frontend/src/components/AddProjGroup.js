import React, { Component } from 'react'
import Group from './Group'
import { Button } from "semantic-ui-react";

export default class ProjectGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adding: false,
			groups: props.projectGroup,
			addButtonDisabled: false
		}
		this.add = this.add.bind(this)
		this.eachGroup = this.eachGroup.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.onCancel = this.onCancel.bind(this)
	}
	add(text) {

		this.setState(prevState => ({
			groups: [
				...prevState.groups,
				{
  				"group_name": "",
  				"group_descr": "",
  				"group_status": "",
  				"group_course": "",
  				"group_url": "",
  				"group_gitlink": "",
  				"group_owner": "",
  				"group_members": [],
  				"id": ""
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

	update(newGroupName, newCourseNumber, newStatus, newDescription, i) {
		this.setState(prevState => ({
			groups: prevState.groups.map(
				group => (group.id !== i) ? group : {...group, groupName: newGroupName, courseNumber: newCourseNumber, status: newStatus, description: newDescription}
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
			groups: prevState.groups.filter(group => group.id !== id)
		}))
	}

	eachGroup(group, i) {
		return (
			<Group key={group.id}
				  index={group.id} groupName={group.group_name} courseNumber={group.group_course} status={group.group_status}
					description= {group.group_descr} member={group.group_members} adding={this.state.adding}
					onCancel={this.onCancel} onChange={this.update} onRemove={this.remove}>
		  </Group>
		)
	}

	render() {
	console.log(this.state)
		return (
			<div className="board">
			<Button basic color="blue" onClick={this.add.bind(null,"")} id="add" disabled={this.state.addButtonDisabled}>+ New Group</Button>


				{this.state.groups.map(this.eachGroup)}
			</div>
		)
	}
}
