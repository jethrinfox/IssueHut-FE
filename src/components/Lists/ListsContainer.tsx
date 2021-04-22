import { Flex, Wrap } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/skeleton"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useListsQuery } from "../../generated/graphql"
import { useGetIntUrl } from "../../hooks/useGetIntUrl"
import { isPositionChanged } from "../../utils/draggablesUtils"
import AddListButton from "./AddListButton"
import List from "./List"
import ListsSkeleton from "./ListsSkeleton"

const ListsContainer: React.FC = () => {
  const projectId = useGetIntUrl("projectId")
  const { data, loading } = useListsQuery({
    skip: projectId === -1,
    variables: { projectId },
  })

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!isPositionChanged(source, destination)) return
    const issueId = Number(draggableId)
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
        {(provided) => (
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
              {data.lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))}
            </Flex>
            <AddListButton projectId={projectId} />
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
