import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    contacts {
      id
      firstName
      lastName
    }
  }
`

export const ADD_CONTACT = gql`
  mutation AddContact($id: String!, $firstName: String!, $lastName: String!) 
    { addContact(id: $id, firstName: $firstName, lastName: $lastName) 
      {
      id
      firstName
      lastName
    }
  }
`
export const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $id: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($id: String!) {
    removeContact(id: $id) {
      id
      firstName
      lastName
    }
  }
`

//schema.js 로부터 정의된 쿼리를 여기서 요청해서 받아놓는것인듯..?
//GET_CONTACTS 는 id, firstName, lastName 요청해서 이 오브젝트를 받아놓은것
//ADD_CONTACT 는 AddContact 라는 함수에서 받아온 id, firstName, lastName 값을 addContact 의 value 값으로 보내주고 object를 리턴해주는것인듯

//  type Query {
//   contact(id: String!): Contact
//   contacts: [Contact]
// }

//type Query 를 이렇게 정의해놨기때문에 위에서 contacts 요청했을때 [Contact] 보내줌


// type Mutation {
//   addContact(id: String!, firstName: String!, lastName: String!): Contact
//   updateContact(id: String!, firstName: String!, lastName: String!): Contact
//   removeContact(id: String!): Contact
// }


//query 날리기
//https://eomtttttt-develop.tistory.com/228