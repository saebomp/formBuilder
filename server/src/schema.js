import {gql} from 'apollo-server-express'
import {find, remove} from 'lodash'

const contacts = [
  {
    id:'1',
    firstName:'firstname1',
    lastName:'lastname1'
  },
  {
    id:'2',
    firstName:'firstname2',
    lastName:'lastname2'
  },
  {
    id:'3',
    firstName:'firstname3',
    lastName:'lastname3'
  }
]

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }
 
  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  }
 
  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String!, lastName: String!): Contact
    removeContact(id: String!): Contact
  }
`

//Muation 을 정의해주고 addContact 라는 함수를 만듬. 이 함수는 parameter 로 id, firstName, lastName 을 받게되고 새롭게 만들어진 Contact 를 리턴해줌


// type 정해주는게 endpoint 이라고 볼수있음. 가져올 포인트를 정해주니깐

//Contact 는 graphql object type name 임
//Query 는 내가 database로부터 정보를 받을때 쓰임
//contacts 를 입력하면 Contact 전체 오브젝트 보내줌
//contact(id:"1") 이렇게 보내면 Contact의 해당 오브젝트 보내줌/ 이건 resolvers 에서 function 으로 정의해뒀기때문에 가능한것임

//Mutation 은 database의 정보를 변형할때 씀

const resolvers = {
  //query 를 resolve (해결)함
  Query: {
    contacts: () => contacts, //사용자가 contacts 라는 query를 보내면 contacts를 반환하는 함수로 답함
    contact(parent, args, context, info) {
      return find(contacts, { id: args.id })
    }
    //args 라는 parameter 보냄. contacts 에서 해당 id를 찾아 반환함
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      contacts.push(newContact)
      return newContact
    },
    //type에서 정의한대로 addContact(id:"4", firstName:"name4", lastName:"namekdj4") 이런식으로 입력하면 괄호안의 부분을 통째로 args로 받아와서 args.id~~ 이런식으로 newContact 오브젝트 만들어줌
    updateContact: (root, args) => {
      const contact = find(contacts, { id: args.id })
      // args로 넣은 id중 같은것을 찾아 해당 오브젝트 리턴함
      if (!contact) {
        throw new Error(`Couldn’t find contact with id ${args.id}`)
      }

      contact.firstName = args.firstName
      contact.lastName = args.lastName
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

//resolvers 는 server.js 에 있는 ApolloServer 서버에서 요청을 받음. ApolloServer가 query 나 mutation 의 정의를 발견하면 resolvers 를 찾고 해당 함수를 실행함


//lodash
//https://blog.naver.com/leenuri7/222072440551