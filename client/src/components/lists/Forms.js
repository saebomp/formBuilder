import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import Form from '../listItems/Form'

import { List } from 'antd'
import { GET_CONTACTS } from '../../graphql/queries'

const getStyles = () =>({
  list:{
    display:'flex',
    justifyContent:'center',
    width:'100%'
  }
})

const Forms = () => {
  const styles = getStyles()

  const {loading, error, data} = useQuery(GET_CONTACTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data', data)
  return (
    <List grid={{guttuer:20, column:1}} style={styles.list}>
        {data.contacts.map(({id, firstName, lastName, address, postal, email}) => (
          <List.Item>
            <Form 
              key={id} 
              id={id} 
              firstName={firstName} 
              lastName={lastName} 
              address={address} 
              postal={postal} 
              email={email} 
            />
          </List.Item>  
        ))}
        
    </List>
  )

}

export default Forms
