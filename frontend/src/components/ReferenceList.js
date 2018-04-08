import React, { Component } from 'react'
import ReferenceListItem from './ReferenceListItem'
import { Button } from "semantic-ui-react";
import axios from 'axios';
import auth from '../Auth'
const userId = auth.getUserInfo();

export default class ReferenceList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: "",
			references: [],
			adding: false,
			addButtonDisabled: false
		}
		this.add = this.add.bind(this)
		this.eachRef = this.eachRef.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.onCancel = this.onCancel.bind(this)

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
				axios.get(`http://localhost:3000/api/userinfos/${this.state.userId}/referenceinfos`)
				.then(response =>{
					console.log(response.data)
					this.setState({references: response.data})
				}
				)
			})
	}

	add(text) {																																		// Add button clicked handler
		this.setState(prevState => ({
			references: [
				...prevState.references,
				{
					ref_provider: '',																											// not finished
					ref_url: text,
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

	update( newProvider, newText, i, addMode ) {
		console.log('updating item at index: ', i, newText)

		if ( addMode ){
			axios.request({
			method:'post',
			url:`http://localhost:3000/api/userinfos/${this.state.userId}/referenceinfos`,
			data: {
				ref_provider: newProvider,
				ref_url: newText,
			}
		}).then(response => {
			console.log( response )
		}).catch(err => console.log(err));

	}else{
		axios.request({
			method:'patch',
			url:`http://localhost:3000/api/referenceinfos/${i}`,
			data: { "ref_provider": newProvider,
		 				"ref_url": newText }
		}).then(response => {
		}).catch(err => console.log(err));
	}

		this.setState(prevState => ({
			references: prevState.references.map(
				reference => (reference.id !== i) ? reference : {...reference, ref_provider: newProvider,
																													ref_url: newText }
			)
		}))

		this.setState({ addButtonDisabled: false })
	}

	onCancel( newState ){
		this.setState({ addButtonDisabled: newState })
	}

	remove(id) {
		console.log('removing item at', id)																					// DEBUG
		axios.delete(`http://localhost:3000/api/referenceinfos/${id}`)
      .then(response => {
        this.setState( {
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })
      })

		this.setState(prevState => ({
			references: prevState.references.filter(reference => reference.id !== id)
		}))
	}

	eachRef(reference, i) {
		console.log ('CL -> checking reference at eachRef: ', reference.course_number, '  ', reference.id, i)									// DEBUG
		return (
			<ReferenceListItem key={reference.id}
				  index={reference.id} label_1='Reference Provider: '
					provider= {reference.ref_provider} url= {reference.ref_url} adding={this.state.adding}
					onCancel={this.onCancel} onChange={this.update} onRemove={this.remove}>
		  </ReferenceListItem>
		)
	}

	render() {
		return (
			<div className="panel-group">
				<Button id="add" basic color="blue" onClick={this.add.bind(null,"")}
								disabled={this.state.addButtonDisabled}>+ Add Reference</Button>

				{this.state.references.map(this.eachRef)}
			</div>
		)
	}
}
