import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import ApolloClientProvider from "../ApolloClient"

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloClientProvider>
      <ChakraProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloClientProvider>
  )
}

export default MyApp
