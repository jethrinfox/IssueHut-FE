import { Flex } from "@chakra-ui/layout"
import { Fade } from "@chakra-ui/transition"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import {
  ListsQueryResult,
  useListsQuery,
  useUpdateListOrderMutation,
} from "../../generated/graphql"
import { useGetIntUrl } from "../../hooks/useGetIntUrl"
import { isPositionChanged } from "../../utils/draggablesUtils"
import AddListButton from "./AddListButton"
import List from "./List"
import ListsSkeleton from "./ListsSkeleton"
import { handleUpdateListOrder } from "../../utils/handleUpdateOrders"

const ListsContainer: React.FC = () => {
  const projectId = useGetIntUrl("projectId")
  const { data: queryData, loading } = useListsQuery({
    skip: projectId === -1,
    variables: { projectId },
  })
  const [updateListOrder] = useUpdateListOrderMutation()

  const [data, setData] = useState<ListsQueryResult["data"] | null>(null)

  const onDragEnd = (result: DropResult) => {
    if (!isPositionChanged(result)) return
    if (result.type === "LISTS") handleUpdateListOrder(result, updateListOrder)
    // if ( result.type === "ISSUES") handleUpdateListOrder()
  }

  useEffect(() => {
    queryData && setData(queryData)
  }, [queryData])

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
                .map((list, index) => (
                  <List key={list.id} list={list} index={index} />
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
