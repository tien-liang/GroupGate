const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// ========== TYPES ==========

// Establish a User object
const UserType = new GraphQLObjectType({
  name:'User',
  fields:() => ({
    id: {type:GraphQLID},
    email: {type: GraphQLString},
    display_name: {type: GraphQLString},
    about_me: {type: GraphQLString},
    password: {type:GraphQLString},                 // secure enough ??
    total_r_skills: {type:GraphQLFloat},
    total_r_comm: {type:GraphQLFloat},
    total_r_psolving: {type:GraphQLFloat},
    total_r_timemngmt: {type:GraphQLFloat},
    total_r_activity: {type:GraphQLFloat},
    num_of_rating: {type:GraphQLInt},
    classes: {
      type: new GraphQLList(ClassType),
      resolve(person) {
        var friends = Object.assign([], person.friends);
        for (i=0; i<person.friends.length; i++){
          person.friends[i] = axios.get('http://localhost:3000/persons/' + friends[i]).then(friend => friend.data);
        }
        return person.friends
      }
    },
    referenceLinks{

    }
  })
});


// Establish Class object
const ClassType = new GraphQLObjectType({
  name: 'Class',
  fields:() => ({
    id: {type:GraphQLID},
    class_number: {type: GraphQLString},
    term_year: {type: GraphQLInt},
    term_semester: {type: GraphQLString},



    })
});



// ========== QUERIES ==========

// This is the root query needed for any GraphQL implementations
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    // Return a specific person using their ID
    person:{
      type: PersonType,
      args:{
        id:{type: GraphQLString},
      },
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/persons/' + args.id)
          .then(res =>
            res.data
          );
      }
    },

    // Return all Users
    users:{
      type: new GraphQLList(PersonType),
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/persons/')
          .then(res => {
            var people = res.data;
            for (h=0; h<people.length; h++){
              var friends = Object.assign([], people[h].friends);
              for (i=0; i<friends.length; i++) {
                people[h].friends[i]=axios.get('http://localhost:3000/persons/' + friends[i]).then(friend => friend.data);
              }
            }
            return res.data;
          });
      }
    }
  }
});


// ========== MUTATIONS ==========

const mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    //Add a new person
    addPerson:{
      type: PersonType,
      args:{
        first_name: {type: new GraphQLNonNull(GraphQLString)},
        last_name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        friends: {type: GraphQLList(GraphQLString)}
      },
      resolve(parentValue, args){
        return axios.post('http://localhost:3000/persons', {
          first_name:args.first_name,
          last_name:args.last_name,
          email:args.email,
          friends:args.friends
        })
        .then(res => res.data);
      }
    },
    // Delete an existing person
    deletePerson:{
      type: PersonType,
      args:{
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args){
        return axios.delete('http://localhost:3000/persons/' + args.id)
        .then(res => res.data);
      }
    },
    // Make changes to an existing person
    editPerson:{
      type: PersonType,
      args:{
        id: {type: new GraphQLNonNull(GraphQLString)},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
        friends: {type: GraphQLList(GraphQLString)}
      },
      resolve(parentValue, args){
        return axios.patch('http://localhost:3000/persons/' + args.id, args)
        .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
