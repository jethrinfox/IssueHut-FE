import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useIssueLazyQuery } from "generated/graphql"
import { IssuePriority } from "utils/constants"

interface IssueModalProps {
  projectId: number
  issueId: number
  isOpen: boolean
  onClose: () => void
}

const IssueModal: React.FC<IssueModalProps> = ({
  projectId,
  issueId,
  isOpen,
  onClose,
}) => {
  const [fetchIssue, { data, loading }] = useIssueLazyQuery({
    variables: { issueId },
  })

  useEffect(() => {
    if (!data && isOpen) {
      fetchIssue()
    }
  }, [isOpen])

  let body

  if (loading) {
    body = (
      <Box>
        <Skeleton width="32" />
        <Skeleton width="32" />
        <Skeleton width="32" />
      </Box>
    )
  }

  if (data) {
    body = (
      <Flex flexDir="column">
        <Box>
          <Text>Description:</Text>
          {data.issue?.description}
        </Box>
        <Box>
          <Text>Archived:</Text>
          <CheckCircleIcon
            marginRight="2"
            color={data.issue?.archived ? "gray.400" : "green.500"}
          />
        </Box>
        <Box>
          <Text>Priority:</Text>
          {data.issue?.priority === IssuePriority.HIGH && (
            <ArrowUpIcon color="red.500" />
          )}
          {data.issue?.priority === IssuePriority.MEDIUM && (
            <ArrowBackIcon color="yellow.500" />
          )}
          {data.issue?.priority === IssuePriority.LOW && (
            <ArrowDownIcon color="green.500" />
          )}
        </Box>
        <Box>
          <Text>Reporter:</Text>
          <Avatar size="sm" placeSelf="flex-end" />
          <Text>{data.issue?.reporter.username}</Text>
        </Box>
        <Box>
          <Text>Description:</Text>
          {data.issue?.description}
        </Box>
      </Flex>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {loading && <SkeletonText width="32" />}
          {data && data.issue?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default IssueModal
