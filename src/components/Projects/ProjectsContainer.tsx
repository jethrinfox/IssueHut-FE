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
import NextLink from "../NextLink"

// interface ProjectsContainerProps {
// }

const ProjectsContainer: FC = () => {
  const { data, loading } = useProjectsQuery()

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
    <Grid my={8} templateColumns="repeat(4, 1fr)" gap={6}>
      {data.projects.map(({ id, name, description, updatedAt }) => (
        <Flex
          key={id}
          minH="40"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flexDir="column"
        >
          <NextLink
            href={`/projects/board/${id}`}
            as="a"
            height="100%"
            width="100%"
            padding="2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            px="8px"
            borderRadius="2px"
            fontSize="14px"
            fontWeight="semibold"
            bg="#f5f6f7"
            borderColor="#ccd0d5"
            color="#4b4f56"
            _hover={{ bg: "#ebedf0" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#bec3c9",
            }}
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
          >
            <Heading as="h4" size="md" isTruncated>
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
          </NextLink>
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
