const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require("./src/generated/prisma-client");
// 1
const typeDefs = `
type Query {
  info: String!
  users: [User!]!
}
type Mutation {
    post(name: String!, email: String!): User!
    deleteUser(name:String!):String!
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
      users: (root, args, context, info) => {
        return context.prisma.users();
      }
    },
    // 3
    Mutation: {
        // 2
        post:(root,args,context,info)=>{
          return context.prisma.createUser({
           name:args.name ,
           email:args.email
          });
        },
        updateUser: (parent,args) => {
            const user = {
             id: `${idCount++}`,
             name: args.name,
             email: args.email,
           }
           for (let i=0; i<context.prisma.users.length; i++) {
            if(args.id==context.prisma.users[i].id){
                users[i]=user;
            }
          }
           return user
         },
         deleteUser: (parent,args,context) => {
            let users1=[]
            console.log(context.prisma.users().name,"r23r23r234234");
          //  for (let i=0; i<context.prisma.users.length; i++) {
          //   if(args.name!=context.prisma.users[i].name){
          //       users1.push(users[i]);
          //   }
          // }
          // if(users.length==users1.length){
          //     return "user not found"
          // }
          //  context.prisma.users=users1;
           return "deleted succesfully"
         }
      },
  }
// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context:{prisma}
})
server.start(() => console.log(`Server is running on http://localhost:4000`))