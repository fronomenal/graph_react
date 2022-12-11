import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import O4Page from "./pages/O4Page";
import Project from "./pages/Project";

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
      <Router>
        <Header/>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/project/:id" element={<Project/>}/>
            <Route path="*" element={<O4Page/>}/>
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  )
}

export default App;
