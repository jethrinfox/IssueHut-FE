import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Fade } from "@chakra-ui/transition"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { List as ListType } from "../../generated/graphql"
import AddIssueButton from "../Issue/AddIssueButton"
import Issue from "./Issue"

interface ListProps {
  list: ListType
  index: number
}

const List: React.FC<ListProps> = ({ list }) => {
  const { id, name, issues, order } = list

  return (
    <Draggable draggableId={id.toString()} index={order - 1}>
      {(provided) => (
        <Box
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
          <Box {...provided.dragHandleProps}>
            <Editable zIndex="sticky" fontWeight="bold" defaultValue={name}>
              <EditablePreview />
              <EditableInput />
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
                  {issues.map((issue, index) => {
                    return <Issue key={issue.id} issue={issue} index={index} />
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
