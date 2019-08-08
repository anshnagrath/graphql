const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema} = graphql;
const users = [{
    'id':'33',
    'firstName':'ansh',
    'age':'25'
},{
    'id':'34',
    'firstName':'test',
    'age':'56'
}]
const UserType = new GraphQLObjectType({
name:'User',
fields:{
    id: {type: GraphQLString},
    firstName:{type:GraphQLString },
    age:{type:GraphQLInt}
}
});
const RootQuery = new GraphQLObjectType({
name:'RootQueryType',    
fields:{
user:{
    type:UserType,
    args:{id:{type:GraphQLString}},
    resolve(parentValue,args){
        return axios.get(`http://localhost:3000/users/${args.id}`).then(res=> res.data)
    }
}

}


})
module.exports = new GraphQLSchema( {query:RootQuery});