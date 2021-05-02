import { Box, Flex, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import Breadcrums from "components//Breadcrums"
import Layout from "components//Layout"
import ListsContainer from "components//Lists/ListsContainer"
import useGetProjectFromQuery from "hooks//useGetProjectFromQuery"
import { useIsAuth } from "hooks//useIsAuth"

const ProjectPage: NextPage = () => {
  useIsAuth()

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
      <Box my={2}>
        <Box>
          <Breadcrums breadcrums={["Project", data?.project?.name, "Board"]} />
          <Heading size="md">{data?.project?.name}</Heading>
        </Box>
        <ListsContainer />
      </Box>
    </Layout>
  )
}

export default ProjectPage
