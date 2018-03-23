import React, { Component } from 'react'
import Group from './Group'
import { Button } from "semantic-ui-react";

export default class ProjectGroup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			groups: [],
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
					id: this.nextId(),
					groupName: text,
					courseNumber: text,
          status: "open",
          description: text
				}
			],
		}))

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
				  index={group.id} groupName={group.groupName} courseNumber={group.courseNumber} status={group.status}
					description= {group.description}
					onCancel={this.onCancel} onChange={this.update} onRemove={this.remove}>
		  </Group>
		)
	}

	render() {
		return (
			<div className="board">
			<Button basic color="blue" onClick={this.add.bind(null,"")} id="add" disabled={this.state.addButtonDisabled}>+ New Group</Button>
				{this.state.groups.map(this.eachGroup)}
			</div>
		)
	}
}
