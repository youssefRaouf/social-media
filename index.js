const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  info: String!
  users: [User!]!
}
type Mutation {
    post(name: String!, email: String!): User!
    deleteUser(id:ID!):String!
    updateUser(id:ID!,name:String,email:String):User
  }

type User {
  id: ID!
  name: String!
  email: String!
}
`
// 2// 1
let users = [
   ]
  let idCount = users.length
  
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      users: () => users,
    },
    // 3
    Mutation: {
        // 2
        post: (parent,args) => {
           const user = {
            id: `${idCount++}`,
            name: args.name,
            email: args.email,
          }

          users.push(user)
          return user
        },
        updateUser: (parent,args) => {
            const user = {
             id: `${idCount++}`,
             name: args.name,
             email: args.email,
           }
           for (let i=0; i<users.length; i++) {
            if(args.id==users[i].id){
                users[i]=user;
            }
          }
           return user
         },
         deleteUser: (parent,args) => {
            let users1=[]
           for (let i=0; i<users.length; i++) {
            if(args.id!=users[i].id){
                users1.push(users[i]);
            }
          }
          if(users.length==users1.length){
              return "user not found"
          }
           users=users1;
           return "deleted succesfully"
         }
      },
  }
// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))