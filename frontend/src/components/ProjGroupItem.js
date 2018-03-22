
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class ProjGroupItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: props.item
    }
  }

  render(){
    return (
        <div className="panel panel-primary">

          <div className="panel-body">
            <div className="panel-title ">
              <div className="col-xs-7">
                <Link to={`/projGroup/${this.state.item.id}`}>
                  {this.state.item.group_name}
                </Link></div>
              <div className="col-xs-3">Course: { this.state.item.group_course } </div>
              <div className="col-xs-2">Status: { this.state.item.group_status }</div>
            </div>

            <div className="col-xs-10">Description: { this.state.item.group_descr } </div>
            <div className="col-xs-10">URL: { this.state.item.group_url } </div>
            <div className="col-xs-10">Members: { this.state.item.group_members } </div>

          </div>
          <div class="col-md-offset-10"><button>Edit</button><button>Remove</button> </div>






        </div>















    )
  }
}
