const gql = require("graphql-tag"); 
// Convierte el string en un Abstract Syntax Tree (AST)

const typeDefs = gql `
type Query {
    "Get tracks array for homepage grid"
  tracksForHome: [Track!]!
  "Get a specific track by ID"
  track(id: ID!): Track   # ← Define que necesita un argumento
}
type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
}

type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
}

type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
}

type Module {
  id: ID!
  title: String!
  length: Int
}
type Author {
    id: ID!
    name: String!
    photo: String    
}
`
module.exports = typeDefs