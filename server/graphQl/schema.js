const {
    buildSchema
} = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        tasks: [Task],
        task(id: String!): Task
    }
    type Mutation {
        updateTask(id: String!, task: String!): Task,
        updateTaskStatus(id: String!, completed: Boolean!): Task,
        deleteTask(id: String!): Task,
        addTask(task: String!): Task
    }
    type Task {
        id: String,
        task: String,
        completed: Boolean
    }
`);

module.exports = schema;