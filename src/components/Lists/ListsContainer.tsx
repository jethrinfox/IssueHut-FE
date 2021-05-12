import { Flex } from "@chakra-ui/layout"
import { Fade } from "@chakra-ui/transition"
import { useListsQuery } from "generated//graphql"
import { useGetIntUrl } from "hooks//useGetIntUrl"
import { FC } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import useDragContext from "../../hooks/useDragContext"
import AddListButton from "./AddListButton"
import List from "./List"
import ListsSkeleton from "./ListsSkeleton"

const ListsContainer: FC = () => {
  const projectId = useGetIntUrl("projectId")
  const { data, loading } = useListsQuery({
    skip: projectId === -1,
    variables: { projectId },
    // fetchPolicy: "no-cache",
  })
  const onDragEnd = useDragContext()

  if (loading) return <ListsSkeleton />

  if (!data) {
    return (
      <Flex py="6">
        <AddListButton projectId={projectId} />
      </Flex>
    )
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, projectId)}>
      <Droppable
        droppableId={projectId.toString()}
        type="LISTS"
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <Flex
            py="4"
            flexWrap="nowrap"
            sx={{
              "&::-webkit-scrollbar": {
                height: "12px",
                borderRadius: "6px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "6px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            <Flex
              flexWrap="nowrap"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {[...data.lists]
                .sort((a, b) => (a.order > b.order ? 1 : -1))
                .map((list) => (
                  <List key={list.id} list={list} issues={list.issues} />
                ))}
              {provided.placeholder}
            </Flex>
            {!snapshot.isDraggingOver && (
              <Fade in={!snapshot.isDraggingOver} unmountOnExit>
                <AddListButton projectId={projectId} />
              </Fade>
            )}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
