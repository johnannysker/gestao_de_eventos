const { gql } = require("apollo-server-express")
const Participant = require("../models/Participant.js")
const Organizer = require("../models/Organizer.js")

const typeDefs = gql`

  type Organizer {
      id: ID!
      name: String!
      email: String
    }

  type Participant {
      id: ID!
      name: String!
      email: String
    }

  type Event {
    id: ID!
    title: String!
    description: String
    organizer: Organizer
    speakers: [String]
    participants: [Participant]
  }

  type Query {
    organizers: [Organizer]
    organizer(id: ID!): Organizer
  }

  type Mutation {
    createOrganizer(name: String!, email: String!, password: String!): Organizer
    updateOrganizer(id: ID!, name: String!, email: String!): Organizer
    deleteOrganizer(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };