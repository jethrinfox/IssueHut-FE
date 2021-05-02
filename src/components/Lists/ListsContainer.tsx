import { Flex } from "@chakra-ui/layout"
import { Fade } from "@chakra-ui/transition"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import {
  useListsQuery,
  useUpdateIssueOrderMutation,
  useUpdateListOrderMutation,
} from "generated//graphql"
import { useGetIntUrl } from "hooks//useGetIntUrl"
import { isPositionChanged } from "utils/draggablesUtils"
import {
  updateCachedIssueOrder,
  updateCachedListOrder,
} from "utils/handleUpdateOrders"
import AddListButton from "./AddListButton"
import List from "./List"
import ListsSkeleton from "./ListsSkeleton"

const ListsContainer: React.FC = () => {
  const projectId = useGetIntUrl("projectId")
  console.log("🚀 ~ projectId", projectId)
  const { data, loading } = useListsQuery({
    skip: projectId === -1,
    variables: { projectId },
  })
  console.log("🚀 ~ loading", loading)
  console.log("🚀 ~ data", data)
  const [updateListOrder] = useUpdateListOrderMutation()
  const [updateIssueOrder] = useUpdateIssueOrderMutation()

  const onDragEnd = (result: DropResult) => {
    if (!isPositionChanged(result)) return
    if (result.type === "LISTS") {
      updateListOrder({
        variables: {
          options: {
            id: Number(result.draggableId),
            order: result.destination!.index + 1,
          },
        },
        update: (cache) => updateCachedListOrder(cache, result, projectId),
      })
    }
    if (result.type === "ISSUES") {
      updateIssueOrder({
        variables: {
          options: {
            id: Number(result.draggableId),
            order: result.destination!.index + 1,
          },
        },
        update: (cache) => updateCachedIssueOrder(cache, result, projectId),
      })
    }
  }

  if (loading) return <ListsSkeleton />

  if (!data) {
    return (
      <Flex py="6">
        <AddListButton projectId={projectId} />
      </Flex>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                  <List key={list.id} list={list} />
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
