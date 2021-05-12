import { IconButton } from "@chakra-ui/button"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { Box } from "@chakra-ui/layout"
import { Issue } from "generated//graphql"
import NextLink from "../NextLink"
import IssueCard from "./IssueCard"

interface IssuesContainerProps {
  issues: Pick<Issue, "name" | "archived" | "priority" | "id" | "order">[]
}

const IssuesContainer: React.FC<IssuesContainerProps> = ({ issues }) => {
  return (
    <>
      {issues.map((issue) => {
        return <IssueCard key={issue.id} issue={issue} />
      })}
      <Box height="10" minW="100%" borderRadius="base" boxShadow="md">
        <NextLink href="/projects/add">
          <IconButton
            aria-label="add list"
            colorScheme="gray"
            color="gray.500"
            height="100%"
            width="100%"
            icon={<PlusSquareIcon fontSize="30" />}
          />
        </NextLink>
      </Box>
    </>
  )
}

export default IssuesContainer
