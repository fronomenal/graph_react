import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header/>
    </ApolloProvider>
  )
}

export default App
