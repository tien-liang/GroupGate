const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
var cors = require('cors')

const app = express();
app.use(cors()) // comment this out to provoke CORS error

app.use('/graphql', expressGraphQL({
  schema:schema,
  graphiql:true
}));

app.listen(3000, () => {
  console.log('Server is running on port 4000...');
});
