import React from 'react'
import {useMutation} from '@apollo/client'
import {filter} from 'lodash'

import {DeleteOutlined} from '@ant-design/icons'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../graphql/queries'

const RemoveContact = ({ id, firstName, lastName }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    
    update(proxy, { data: { removeContact } }) {
      const { contacts } = proxy.readQuery({ query: GET_CONTACTS })
      proxy.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, c => {
            return c.id !== removeContact.id
          })
          //내가 삭제한거 빼고 다 리턴하라는 뜻
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this conatact?')
    if (result) {
      removeContact({
        variables: {
          id
        },
        optimisticResponse:{
          __typename:'Mutation',   //query type 확인
  
          removeContact:{ //mutation 이름
            __typename:'Contact',  //받을 오브젝트 타입-> single contact
            id,
            firstName,
            lastName
          }
        }
      })
    }
  }
  return (
    <DeleteOutlined 
      key='delete' 
      style={{color:'red'}} 
      onClick={handleButtonClick}
    />
  )
}

export default RemoveContact