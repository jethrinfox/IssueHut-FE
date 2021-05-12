import { PlusSquareIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useProjectsQuery } from "generated//graphql"
import { FC, useRef } from "react"
import AddProjectDrawer from "./AddProjectDrawer"
import ProjectCard from "./ProjectCard"

// interface ProjectsContainerProps {
// }

const ProjectsContainer: FC = () => {
  const { data, loading } = useProjectsQuery()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  if (loading) {
    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Skeleton height="8rem" />
        <Skeleton height="8rem" />
        <Skeleton height="8rem" />
        <Skeleton height="8rem" />
        <Skeleton height="8rem" />
        <Skeleton height="8rem" />
      </Grid>
    )
  }

  if (!data) {
    return (
      <Flex my={8} justifyContent="center">
        <Box>
          <Text fontSize="4xl">You got no posts for some reason</Text>
        </Box>
      </Flex>
    )
  }

  return (
    <>
      <Grid my={8} templateColumns="repeat(4, 1fr)" gap={6}>
        {[...data.projects]
          .sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1))
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        <Flex
          minH="40"
          maxW="sm"
          borderRadius="lg"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            onClick={onOpen}
            ref={btnRef}
            aria-label="add project"
            height="100%"
            width="100%"
            icon={<PlusSquareIcon fontSize="50" color="white" />}
          />
        </Flex>
      </Grid>
      <AddProjectDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  )
}

export default ProjectsContainer
