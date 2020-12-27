import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    contacts {
      id
      firstName
      lastName
      address
      postal
      email
    }
  }
`

export const ADD_CONTACT = gql`
  mutation AddContact(
    $id: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $postal: String!,
    $email: String!
    ) 
    { addContact(id: $id, firstName: $firstName, lastName: $lastName, address: $address, postal: $postal, email: $email) 
      {
      id
      firstName
      lastName
      address
      postal
      email
    }
  }
`
export const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $id: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $postal: String!,
    $email: String!
  ) {
    updateContact(id: $id, firstName: $firstName, lastName: $lastName, address: $address, postal: $postal, email: $email) {
      id
      firstName
      lastName
      address
      postal
      email
    }
  }
`

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($id: String!) {
    removeContact(id: $id) {
      id
      firstName
      lastName
      address
      postal
      email
    }
  }
`

