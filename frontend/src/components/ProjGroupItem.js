
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from "semantic-ui-react";


export default class ProjGroupItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: props.item
    }
  }

  render(){
    return (
      <table className="ui single line basic table">
        <thead>
          <tr>
            <th className="two wide">{"Group Name"}</th>
            <th className="two wide">{"Course Number"}</th>
            <th className="two wide">{"Status"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to={`/projGroup/${this.state.item.id}`}>
              {this.state.item.group_name}
            </Link></td>
            <td>{ this.state.item.group_course }</td>
            <td>{ this.state.item.group_status }</td>
          </tr>
          <tr>
            <td>Description: { this.state.item.group_descr }</td>
          </tr>
          <tr>
            <td>URL: {this.state.item.group_url}</td>
          </tr>
					<tr>
						<td>{"Group Member: "}{this.state.item.group_members.map((name,i)=>{
							return name + " ";
						})}</td>
					</tr>
          <tr>
            <td colSpan="4">
				<span>
					<button className="ui primary button right floated" id="join">Join</button>
				</span>
      </td>
    </tr>
      </tbody>
    </table>

    )
  }
}
