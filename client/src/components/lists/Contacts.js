import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import Contact from '../listItems/Contact'

import { List } from 'antd'
import { GET_CONTACTS } from '../../graphql/queries'

const getStyles = () =>({
  list:{
    display:'flex',
    justifyContent:'center'
  }
})

const Contacts = () => {
  const styles = getStyles()

  const {loading, error, data} = useQuery(GET_CONTACTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data', data)
  return (
    <List grid={{guttuer:20, column:1}} style={styles.list}>
        {data.contacts.map(({id, firstName, lastName}) => (
          <List.Item>
            <Contact 
              key={id} id={id} firstName={firstName} lastName={lastName}  
            />
          </List.Item>  
        ))}
        
    </List>
  )

}

export default Contacts

//https://www.apollographql.com/docs/react/data/queries/
// useQuery React hooks는 아폴로 애플리케이션에서 쿼리를 실행하기 위한 기본 API이다. 리액트 구성 요소 내에서 쿼리를 실행하려면 useQuery를 호출하여 GraphQL 쿼리 문자열을 전달하십시오. 구성 요소가 렌더링되면 useQuery는 UI를 렌더링하는 데 사용할 수 있는 {loading, error, data}가 포함된 개체를 Apollo Client에서 반환한다.

//https://blog.naver.com/qkrthals0524/222114422146
//영화앱 만들기 . useQuery 사용등
//GET_CONTACTS에 저장된 쿼리는 useQuery 함수를 이용해서 호출할 수 있고,usequery함수의 리턴값으로부터 결과 데이터(data), 로딩여부(loading),오류데이터(error)를 읽어올 수 있다.


//data.contacts.map(({id, firstName, lastName})  
//contats 오브젝트를 map으로 돌려서 Contact 로 넘겨줌
