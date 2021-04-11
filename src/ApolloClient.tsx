import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URI,
  cache: new InMemoryCache(),
})

interface ApolloClientProps {
  children: React.ReactNode
}

const ApolloClientProvider: React.FC<ApolloClientProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
