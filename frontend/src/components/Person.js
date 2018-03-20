import React, { Component } from 'react'

class Person extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.person.first_name} ({this.props.person.last_name})
        </div>
      </div>
    )
  }
}

export default Person