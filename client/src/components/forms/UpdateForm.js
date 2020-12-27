import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button, Row, Col } from 'antd'

import { UPDATE_CONTACT } from '../../graphql/queries'

const UpdateForm = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [address, setAddress] = useState(props.address)
  const [postal, setPostal] = useState(props.postal)
  const [email, setEmail] = useState(props.email)
  const [updateContact] = useMutation(UPDATE_CONTACT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName, address, postal, email} = values
    updateContact({
      variables: {
        id,
        firstName,
        lastName,
        address,
        postal,
        email
      },
      optimisticResponse: {
        __typename: 'Mutuation',
        updateContact: {
          __typename: 'Contact',
          id,
          firstName,
          lastName,
          address,
          postal,
          email
        }
      }
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      onFinish={onFinish}
      size='large'
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        address: address,
        postal: postal,
        email: email
      }}
      size='large'
    >
    <Row gutter={[16,0]}>
      <Col span={12}>
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Please input a first name!' }]}
        >
          <Input
            onChange={e => props.updateStateVariable('firstName', e.target.value)}
            placeholder='i.e. John'
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Please input a last name!' }]}
        >
          <Input
            onChange={e => props.updateStateVariable('lastName', e.target.value)}
            placeholder='i.e. John'
          />
        </Form.Item>
      </Col>
      </Row>
      <Row gutter={[16,0]}>
        <Col span={12}>
          <Form.Item
            name='address'
            rules={[{required:true, message:'Please input your address!'}]}
          >
            <Input 
              onChange={e => props.updateStateVariable('address', e.target.value)}
              placeholder='i.e. 100 Robson street' 
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='postal'
            rules={[{required:true, message:'Please input your postal codes!'}]}
          >
            <Input 
              onChange={e => props.updateStateVariable('postal', e.target.value)}
              placeholder='i.e. A0BC1D' 
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name='email'
        rules={[{required:true, message:'Please input your address!'}]}
      >
        <Input 
          onChange={e => props.updateStateVariable('email', e.target.value)}
          placeholder='i.e. abcd@gmail.com' 
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') &&
                !form.isFieldTouched('lastName')) &&
                !form.isFieldsTouched('address') &&
                !form.isFieldsTouched('postal') &&
                !form.isFieldTouched('email') ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateForm