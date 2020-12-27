import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import Forms from './components/lists/Forms'
import AddForm from './components/forms/AddForm'
import './App.css'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
  <div className='App'>
    <Title />
    <AddForm />
    <Forms />
  </div>  
  </ApolloProvider>
)

export default App;



