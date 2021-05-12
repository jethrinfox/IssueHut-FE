import { StarIcon } from "@chakra-ui/icons"
import { Flex, Heading, Divider, Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Project } from "../../generated/graphql"
import NextLink from "../NextLink"

interface ProjectCardProps {
  project: Pick<Project, "id" | "name" | "description" | "updatedAt">
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { id, name, description, updatedAt } = project

  return (
    <Flex
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
  )
}

export default ProjectCard
