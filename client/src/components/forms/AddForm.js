import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Select, Row, Col } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CONTACT, GET_CONTACTS } from '../../graphql/queries'


const AddForm = () => {
  const [id] = useState(uuidv4())
  const [addContact] = useMutation(ADD_CONTACT)
  //queries.js 에서 받아둔 ADD_CONTACT 값을 addContact 라는 array에 넣어둔다..? 

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  //forceUpdate 는 method 호출을 통해 리액트에게 해당 컴퍼넌트가 업데이트됐으니 다시 렌더링하라고 알려줌

  useEffect(() => {
    forceUpdate({})
  }, [])

  
  const onFinish = values => {
    const {firstName, lastName} = values
    //onFinish :Trigger after submitting the form and verifying data successfully

    addContact({
      variables: {
        id,
        firstName,
        lastName
      },
      //새로운 연락처 추가할때 새로고침 안해도 바로 업데이트 되는부분
      optimisticResponse:{
        __typename:'Mutation',   //query type 확인

        addContact:{ //mutation 이름
          __typename:'Contact',  //받을 오브젝트 타입-> single contact
          id,
          firstName,
          lastName
        }
      },
      update:(proxy, {data: { addContact } }) => {  
        //proxy는 readQuery 와 writeQuery 라는 method 에 access할수있게 해줌
        //data:{addContact}}    data를 distructoring 하고 onFinish 안에있는 addContact 부름
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
          name='postalcodes'
          // rules={[{required:true, message:'Please input your postal codes!'}]}
        >
          <Input placeholder='i.e. 100 A0BC1D' />
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
    <Form.Item label="Gender">
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="other">Other</Select.Option>
      </Select>
    </Form.Item>
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

//https://www.apollographql.com/docs/react/performance/optimistic-ui/

// https://ant.design/components/form/