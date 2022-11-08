import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header/>
      <main className="container">
        <Clients/>
      </main>
    </ApolloProvider>
  )
}

export default App
