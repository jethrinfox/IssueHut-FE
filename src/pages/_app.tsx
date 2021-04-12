import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import { useApollo } from "../utils/ApolloClient"

function MyApp({ Component, pageProps }: any) {
  const store = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={store}>
      <ChakraProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
