import React from 'react'
import {useMutation} from '@apollo/client'
import {filter} from 'lodash'

import {DeleteOutlined} from '@ant-design/icons'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../graphql/queries'

const RemoveForm = ({ id, firstName, lastName, address, postal, email}) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    
    update(proxy, { data: { removeContact } }) {
      const { contacts } = proxy.readQuery({ query: GET_CONTACTS })
      proxy.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, c => {
            return c.id !== removeContact.id
          })
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
          __typename:'Mutation',  
  
          removeContact:{ 
            __typename:'Contact',  
            id,
            firstName,
            lastName,
            address,
            postal,
            email
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

export default RemoveForm