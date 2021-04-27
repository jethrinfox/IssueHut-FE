import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons"
import {
  Avatar,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { Draggable } from "react-beautiful-dnd"
import { List } from "../../generated/graphql"
import { useGetIntUrl } from "../../hooks/useGetIntUrl"
import { IssuePriority } from "../../utils/constants"
import IssueModal from "../Issue/IssueModal"

interface IssueProps {
  issue: List["issues"][0]
  index: number
}

const Issue: React.FC<IssueProps> = ({ issue, index }) => {
  const projectId = useGetIntUrl("projectId")
  const { name, archived, priority, id } = issue

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IssueModal
        isOpen={isOpen}
        onClose={onClose}
        issueId={id}
        projectId={projectId}
      />
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <LinkBox as="article">
            <Flex
              flexDir="column"
              bg="whiteAlpha.800"
              my="2"
              width="100%"
              minH="10"
              padding="2"
              borderRadius="base"
              boxShadow="base"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
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
                  {priority === IssuePriority.HIGH && (
                    <ArrowUpIcon color="red.500" />
                  )}
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
          </LinkBox>
        )}
      </Draggable>
    </>
  )
}

export default Issue
