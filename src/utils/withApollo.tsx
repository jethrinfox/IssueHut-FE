// lib/withApollo.js
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import withApollo from "next-with-apollo"

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URI,
        credentials: "include",
      }),
      cache: new InMemoryCache().restore(initialState || {}),
      connectToDevTools: process.env.NODE_ENV === "development",
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    },
  },
)
