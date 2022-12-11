import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import ClientPostModal from "./components/ClientPostModal";

const cache = new InMemoryCache({typePolicies:{Query:{fields:{
  clients:{merge(existing, incoming){
    return incoming;
  }},
  projects:{merge(existing, incoming){
    return incoming;
  }}
}}}});

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header/>
      <main className="container">
        <ClientPostModal></ClientPostModal>
        <Projects/>
        <Clients/>
      </main>
    </ApolloProvider>
  )
}

export default App;
