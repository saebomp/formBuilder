import {gql} from 'apollo-server-express'
import {find, remove} from 'lodash'

const contacts = [
  {
    id:'1',
    firstName:'John',
    lastName:'Doe',
    address:'2209 Woodrow Way',
    postal:'77002',
    email:'john@gmail.com'
  },
  {
    id:'2',
    firstName:'Cillian',
    lastName:'Lowry',
    address:'4769 Luke Lane',
    postal:'77002',
    email:'cillian@gmail.com',
  },
  {
    id:'3',
    firstName:'Alec',
    lastName:'Gilmour',
    address:'689 Pinnickinick Street',
    postal:'55804',
    email:'alec@gmail.com'
  }
]

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String!
    lastName: String!
    address:String!
    postal:String!
    email:String!
  }
 
  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  }
 
  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!, address:String!, postal:String!, email:String!): Contact
    updateContact(id: String!, firstName: String!, lastName: String!, address:String!, postal:String!, email:String!): Contact
    removeContact(id: String!): Contact
  }
`

const resolvers = {
  Query: {
    contacts: () => contacts, 
    contact(parent, args, context, info) {
      return find(contacts, { id: args.id })
    }
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
        address: args.address,
        postal: args.postal,
        email: args.email
      }
      contacts.push(newContact)
      return newContact
    },

    updateContact: (root, args) => {
      const contact = find(contacts, { id: args.id })
      if (!contact) {
        throw new Error(`Couldn’t find contact with id ${args.id}`)
      }

      contact.firstName = args.firstName
      contact.lastName = args.lastName
      contact.address = args.address
      contact.postal = args.postal
      contact.email = args.email
      return contact
    },
    removeContact: (root, args) => {
      const removedContact = find(contacts, { id: args.id })
      if (!removedContact) {
        throw new Error(`Couldn’t find contact with id ${args.id}`)
      }
      remove(contacts, c => {
        return c.id === removedContact.id
      })
      return removedContact
    }
  }
}

export { typeDefs, resolvers }

