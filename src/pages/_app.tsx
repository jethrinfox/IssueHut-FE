import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import theme from "../utils/theme"
import withApollo from "../utils/withApollo"
import Head from "next/head"

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>IssueHut ⛺</title>
        <meta property="og:title" content="IssueHut ⛺" key="title" />
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default withApollo(MyApp)
