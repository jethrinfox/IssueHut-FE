import { Box, Flex, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import Breadcrums from "../../../components/Breadcrums"
import Layout from "../../../components/Layout"
import ListsContainer from "../../../components/Projects/Lists/ListsContainer"
import useGetProjectFromQuery from "../../../hooks/useGetProjectFromQuery"

const ProjectPage: NextPage = () => {
  const { data, loading } = useGetProjectFromQuery()

  if (!data && !loading) {
    return (
      <Layout>
        <Flex my={8} justifyContent="center">
          You got no projects for some reason
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box my={4}>
        <Box marginBottom="4">
          <Breadcrums breadcrums={["Project", data?.project?.name, "view"]} />
        </Box>
        <Heading size="md">{data?.project?.name}</Heading>
        <ListsContainer />
      </Box>
    </Layout>
  )
}

export default ProjectPage
