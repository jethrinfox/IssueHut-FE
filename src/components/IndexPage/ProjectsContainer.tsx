import { PlusSquareIcon, StarIcon } from "@chakra-ui/icons"
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"
import { useProjectsQuery } from "../../generated/graphql"

// interface ProjectsContainerProps {
// }

const ProjectsContainer: FC = () => {
  const { data, loading } = useProjectsQuery()

  if (loading) {
    return (
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
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
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {data.projects.map(({ id, name, description, updatedAt }) => (
        <Flex
          key={id}
          minH="40"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flexDir="column"
          padding="2"
        >
          <Heading as="h4" size="lg">
            {name}
          </Heading>
          <Divider marginBottom="2" />
          <Text>{description}</Text>
          <Flex flex="1" alignItems="flex-end">
            <Flex alignItems="center">
              <StarIcon color="orange.500" />
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {new Date(Number(updatedAt)).toLocaleDateString()}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      ))}
      <Flex
        minH="40"
        maxW="sm"
        borderRadius="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/projects/add">
          <IconButton
            aria-label="add project"
            height="100%"
            width="100%"
            icon={<PlusSquareIcon fontSize="50" color="white" />}
          />
        </Link>
      </Flex>
    </Grid>
  )
}

export default ProjectsContainer
