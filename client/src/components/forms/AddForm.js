import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Row, Col } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CONTACT, GET_CONTACTS } from '../../graphql/queries'


const AddForm = () => {
  const [id] = useState(uuidv4())
  const [addContact] = useMutation(ADD_CONTACT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  
  const onFinish = values => {
    const {firstName, lastName, address, postal, email} = values

    addContact({
      variables: {
        id,
        firstName,
        lastName,
        address,
        postal,
        email
      },
      optimisticResponse:{
        __typename:'Mutation',   

        addContact:{
          __typename:'Contact', 
          id,
          firstName,
          lastName,
          address,
          postal,
          email
        }
      },
      update:(proxy, {data: { addContact } }) => {  
       
        const data = proxy.readQuery({ query:GET_CONTACTS})
        proxy.writeQuery({
          query:GET_CONTACTS,
          data:{
            ...data,
            contacts:[...data.contacts, addContact]
          }
        })
      }
    })
  }
  
  return (
    <Form
    form={form}
    name='add-contact-form'
    // layout='horizontal'
    onFinish={onFinish}
    size='large'
    style={{ marginBottom: '40px' }}
  >
    <Row gutter={[16,0]}>
      <Col span={12}>
        <Form.Item
          label="First Name"
          name='firstName'
          // rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder='i.e. John' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Last Name"
          name='lastName'
          // rules={[{required:true, message:'Please input your last name!'}]}
        >
          <Input placeholder='i.e. Smith' />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={[16,0]}>
      <Col span={12}>
        <Form.Item
          label="Address"
          name='address'
          // rules={[{required:true, message:'Please input your address!'}]}
        >
          <Input placeholder='i.e. 100 Robson street' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Postal Codes"
          name='postal'
          // rules={[{required:true, message:'Please input your postal codes!'}]}
        >
          <Input placeholder='i.e. A0BC1D' />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item
      label="Email"
      name='email'
      // rules={[{required:true, message:'Please input your address!'}]}
    >
      <Input placeholder='i.e. abcd@gmail.com' />
    </Form.Item>
    {/* <Form.Item label="Gender">
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="other">Other</Select.Option>
      </Select>
    </Form.Item> */}
    <Form.Item shouldUpdate={true} style={{textAlign:'center'}}> 
      {() => (
        <Button 
        type='primary' 
        htmlType='submit'
        style={{width:'100%'}}
        >
          Submit
        </Button>
      )}
    </Form.Item>
  </Form>
  )
}

export default AddForm

