import { Center, Heading } from "@chakra-ui/layout"
import { NextPage } from "next"
import Layout from "../components/Layout"

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Center marginTop="6rem">
        <Heading>Index Page</Heading>
      </Center>
    </Layout>
  )
}

export default IndexPage
