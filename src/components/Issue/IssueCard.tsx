import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons"
import { Avatar, Flex, LinkOverlay, Text } from "@chakra-ui/react"
import { Issue } from "generated//graphql"
import { IssuePriority } from "utils/constants"

interface IssueCardProps {
  issue: Pick<Issue, "name" | "archived" | "priority" | "id" | "order">
  onOpen?: () => void
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onOpen }) => {
  const { name, archived, priority } = issue

  return (
    <Flex
      flexDir="column"
      bg="whiteAlpha.800"
      my="2"
      width="100%"
      minH="10"
      padding="2"
      borderRadius="base"
      boxShadow="base"
    >
      <LinkOverlay onClick={onOpen} href="#">
        <Text marginBottom="2">{name}</Text>
      </LinkOverlay>
      <Flex
        flexDir="row"
        alignItems="center"
        minW="100%"
        justifyContent="space-between"
      >
        <Flex alignItems="center" fontSize="larger">
          <CheckCircleIcon
            marginRight="2"
            color={archived ? "gray.400" : "green.500"}
          />
          {priority === IssuePriority.HIGH && <ArrowUpIcon color="red.500" />}
          {priority === IssuePriority.MEDIUM && (
            <ArrowBackIcon color="yellow.500" />
          )}
          {priority === IssuePriority.LOW && (
            <ArrowDownIcon color="green.500" />
          )}
        </Flex>
        <Avatar size="sm" placeSelf="flex-end" />
      </Flex>
    </Flex>
  )
}

export default IssueCard
