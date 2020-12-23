import React, { useState } from 'react'

import { Card } from 'antd'
import RemoveForm from '../buttons/RemoveForm'
import { EditOutlined } from '@ant-design/icons'
import UpdateForm from '../forms/UpdateForm'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Form = props => {
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
        <UpdateForm
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
          <RemoveForm id={id} firstName={firstName} lastName={lastName} />
        ]}
      >
        {fullName()}
      </Card>
      )}
    </div>
  )
}

export default Form