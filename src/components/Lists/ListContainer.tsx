import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable"
import { Box, Flex } from "@chakra-ui/layout"
import { Fade } from "@chakra-ui/transition"
import { Issue, List as ListType } from "generated/graphql"
import { Draggable, Droppable } from "react-beautiful-dnd"
import AddIssueButton from "../Issue/AddIssueButton"
import IssueCard from "../Issue/IssueCard"

interface ListProps {
  list: Pick<ListType, "id" | "name" | "order">
  issues: Pick<Issue, "name" | "archived" | "priority" | "id" | "order">[]
  handleListTitleUpdate: (nextValue: string) => void
}

const List: React.FC<ListProps> = ({ list, issues, handleListTitleUpdate }) => {
  const { id, name, order } = list

  return (
    <Draggable draggableId={id.toString()} index={order - 1}>
      {(provided) => (
        <Box
          position="relative"
          minH="40"
          overflowX="hidden"
          overflowY="auto"
          width="52"
          bg="gray.100"
          mr="3"
          py="2"
          px="1"
          border="1px"
          borderColor="blackAlpha.100"
          borderRadius="base"
          boxShadow="md"
          flex="0 0 auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "12px",
              borderRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Box height="34px" width="198px" {...provided.dragHandleProps}></Box>
          <Box height="34px" marginTop="-34px" position="absolute">
            <Editable
              onChange={handleListTitleUpdate}
              fontWeight="bold"
              defaultValue={name}
            >
              <EditablePreview />
              <EditableInput width="198px" />
            </Editable>
          </Box>
          <Flex flexDir="column">
            <Droppable droppableId={list.id.toString()} type="ISSUES">
              {(provided, snapshot) => (
                <Flex
                  flexDir="column"
                  width="100%"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {[...issues]
                    .sort((a, b) => (a.order > b.order ? 1 : -1))
                    .map((issue) => {
                      return <IssueCard key={issue.id} issue={issue} />
                    })}
                  {provided.placeholder}
                  {!snapshot.isDraggingOver && (
                    <Fade in={!snapshot.isDraggingOver} unmountOnExit>
                      <AddIssueButton listId={list.id} />
                    </Fade>
                  )}
                </Flex>
              )}
            </Droppable>
          </Flex>
        </Box>
      )}
    </Draggable>
  )
}

export default List
