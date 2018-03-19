// Left in to see the graphql handles from web-demo

import React, { Component } from 'react'
import Person from './Person'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PersonList extends Component {
  render() {
    if (this.props.personQuery && this.props.personQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.personQuery && this.props.personQuery.error) {
      return <div>Error</div>
    }

    const peopleToRender = this.props.personQuery.persons
    return (
      <div>{peopleToRender.map(person => <Person key={person.id} person={person}/>)}</div>
    )
  }
}

const PERSON_QUERY = gql`
query {
  persons {
    id
    first_name
    last_name
    email
  }
}
`

console.log(PERSON_QUERY)
export default graphql(PERSON_QUERY, { name: 'personQuery' }) (PersonList)
