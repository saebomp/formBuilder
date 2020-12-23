import React, { useState } from 'react'

import { Card } from 'antd'
import RemoveContact from '../buttons/RemoveContact'
import { EditOutlined } from '@ant-design/icons'
import UpdateContact from '../forms/UpdateContact'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Contact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const fullName = () => {
    return `${props.firstName} ${props.lastName}`
  }

  //Contatc.js 에서 받은 props로 fullname return 함

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
      <Card
        id={props.id}
        style={styles.card}
        actions={[
          <EditOutlined key='edit' onClick={handleButtonClick} />,
          <RemoveContact id={id} firstName={firstName} lastName={lastName} />
        ]}
      >
        {fullName()}
      </Card>
      )}
    </div>
  )
}

export default Contact