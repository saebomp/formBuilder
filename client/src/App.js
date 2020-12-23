import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import AddContact from './components/forms/AddContact'
import './App.css'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
  <div className='App'>
    <Title />
    <AddContact />
    <Contacts />
  </div>  
  </ApolloProvider>
)

export default App;

//ApolloProvider is to connect apollo client with our application
//data를 fetch해서 앱으로 provide 한다고함

//https://github.com/paulhklam1122/react-apollo-graphql-wmdd-4999-sept-2020

//apollo client 는 gql 의 결과를 InMemoryCache 에 저장하고, 우리는 이 데이터를 요청할 수 있다고한다

