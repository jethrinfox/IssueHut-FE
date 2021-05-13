import { LinkBox, useDisclosure } from "@chakra-ui/react"
import IssueCard from "components/Issue/IssueCard"
import { Issue } from "generated//graphql"
import { useGetIntUrl } from "hooks//useGetIntUrl"
import { Draggable } from "react-beautiful-dnd"
import IssueModal from "./IssueModal"

interface IssueCardContainerProps {
  issue: Pick<Issue, "name" | "archived" | "priority" | "id" | "order">
}

const IssueCardContainer: React.FC<IssueCardContainerProps> = ({ issue }) => {
  const projectId = useGetIntUrl("projectId")
  const { id, order } = issue

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IssueModal
        isOpen={isOpen}
        onClose={onClose}
        issueId={id}
        projectId={projectId}
      />
      <Draggable draggableId={id.toString()} index={order - 1}>
        {(provided) => (
          <LinkBox
            as="article"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <IssueCard issue={issue} onOpen={onOpen} />
          </LinkBox>
        )}
      </Draggable>
    </>
  )
}

export default IssueCardContainer
