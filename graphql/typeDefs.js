const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Organizer {
    id: ID!
    name: String!
    email: String!
    profile: Profile
  }

  type Profile {
    bio: String
    avatar: String
  }

  type Event {
    id: ID!
    title: String!
    description: String
    organizer: Organizer
    speakers: [Talk]
    participants: [Participant]
  }

  type Talk {
    id: ID!
    title: String!
    event: Event
    speaker: String
  }

  type Participant {
    id: ID!
    name: String!
    email: String!
    registeredEvents: [Event]
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    organizers: [Organizer]
    organizer(id: ID!): Organizer
  }

  type AuthPayload {
    token: String!
    organizer: Organizer!
  }

  type Mutation {
    createEvent(title: String!, description: String!, organizerId: ID!): Event
    createOrganizer(name: String!, email: String!, password: String!): Organizer
    loginOrganizer(email: String!, password: String!): AuthPayload
  }
`;

module.exports = { typeDefs };