import React, { Component } from 'react';
import providerOptions from './common/providerOptions.json';
// import linkedin_img from "./images/avatars/linkedin.png";

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
							<input type="text" ref={input => this._newText = input}
							  	defaultValue={this.props.url}/>
						</div>
					</div>
					<button className="ui primary button right floated" id="save" onClick={this.save}>Save</button>
					<button className="ui red button right floated" id="cancel" onClick={this.cancel}>Cancel</button>
				</form>
			</div>
			/*
			<div className="reference" style={this.style}>
				<form>

						{this.props.label_1}

						<dropdown placeholder='Select Provider' fluid selection options={providerOptions} />


						{this.props.label_2}
						<container>
							<input type="text" ref={input => this._newText = input} defaultValue={this.props.refProfileUrl}/>
						</container>

									{this.props.value_2}

						<button>
							<button id="save" onClick={this.save}>Save</button>

							<button id="cancel" onClick={this.cancel}>Cancel</button>
						</button>




				</form>
			</div>
			*/
		)
	}
	providerIcon(provider){
		if (provider == "LinkedIn"){
			return (<i className="fa fa-linkedin fa-2x"></i>);
		} else if (provider == "Git"){
			return (<i className="fa fa-github fa-2x"></i>);
		} else if (provider == "StackOverflow"){
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
						<td>{this.props.url}</td>
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
			/*
			<div className="" style={this.style}>
				<p> {this.props.label_1}{this.props.children}</p>
				{this.props.label_2}{this.props.value_2}{this.props.value_3}
				<span>
					<button onClick={this.edit} id="edit">edit</button>
					<button onClick={this.remove} id="remove">remove</button>
				</span>
			</div>*/
		)
	}
	render() {
		return this.state.editing || this.state.adding ? this.renderForm() : this.renderDisplay()
	}
}
