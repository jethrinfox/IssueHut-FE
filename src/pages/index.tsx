import { Box, Heading } from "@chakra-ui/layout"
import { NextPage } from "next"
import ProjectsContainer from "../components/Projects/ProjectsContainer"
import Layout from "../components/Layout"

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Box marginTop="3rem" display="flex" flexDir="column">
        <Heading textAlign="center" marginBottom="2rem">
          Projects
        </Heading>
        <Box>
          <ProjectsContainer />
        </Box>
      </Box>
    </Layout>
  )
}

export default IndexPage
