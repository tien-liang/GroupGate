import React, { Component } from 'react';
import { Label } from "semantic-ui-react";
import {Link} from 'react-router-dom';

export default class ReferenceListItem extends Component {
	constructor(props) {
		super(props)
		this.ESCAPE_KEY = 27;
		this.ENTER_KEY = 13;

		this.state = {
			provider: this.props.provider,
			adding: props.adding,
			editing: false,
			addButtonDisabled: props.addButtonDisabled,
			url: ""
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.cancel = this.cancel.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.setURL = this.setURL.bind(this)
	}

	componentDidUpdate() {
		var textArea
		if(this.state.editing) {
			textArea = this._newText
			textArea.focus()
			textArea.select()
		}
	}
	defaultURL(provider){
		if(provider === "StackOverflow"){
			return "http://stackoverflow.com/users/"
		}else if(provider === "Git"){
			return "http://github.com/"
		}else{
			return "http://www.linkedin.com/in/"
		}
	}
	setURL(){
		this.setState({url: this.defaultURL(this.state.provider)+this.props.url})
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
		this.props.onChange(this._newProvider.value,this._newText.value, this.props.index, this.state.adding)
		this.setState({
			editing: false
		})
		this.setState({adding: false})
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
		this.setState({provider: e.target.value})
	}

	renderForm() {
		return (
			<div className="ui clearing segment">
				<form className="ui form">
					<div className="fields">
						<div className="four wide field">
							<label>{this.props.label_1}{/* = Provider */}</label>
							<select className="ui fluid dropdown" value={this.state.provider} ref={input=> this._newProvider = input} onChange={this.handleChange}>
								<option value="LinkedIn">LinkedIn</option>
								<option value="Git">Git</option>
								<option value="StackOverflow">StackOverflow</option>
							</select>
						</div>
						<div className="twelve wide field">
							<label>URL</label>
							<div className="inline field">
							<Label size="huge" horizontal>
    						{this.defaultURL(this.state.provider)}
  						</Label>
							<input type="text" ref={input => this._newText = input}
							  	defaultValue={this.props.url}/>
								</div>
						</div>
					</div>
					<button className="ui primary button right floated" id="save" onClick={this.save}>Save</button>
					<button className="ui red button right floated" id="cancel" onClick={this.cancel}>Cancel</button>
				</form>
			</div>
		)
	}
	providerIcon(provider){
		if (provider === "LinkedIn"){
			return (<i className="fa fa-linkedin fa-2x"></i>);
		} else if (provider === "Git"){
			return (<i className="fa fa-github fa-2x"></i>);
		} else if (provider === "StackOverflow"){
			return (<i className="fa fa-stack-overflow fa-2x"></i>);
		} else{
			return provider;
		}
	}
	renderDisplay() {
		return (
			<table className="ui single line basic table">
				<thead>
					<tr>
						<th className="three wide">
							{this.props.label_1} </th>
						<th>{"URL"}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="center aligned">{this.providerIcon(this.props.provider)}</td>
						<td><a>{this.defaultURL(this.props.provider)}{this.props.url}</a></td>
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
