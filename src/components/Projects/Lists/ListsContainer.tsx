import { Flex, Wrap } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/skeleton"
import { useListsQuery } from "../../../generated/graphql"
import { useGetIntUrl } from "../../../hooks/useGetIntUrl"
import AddListButton from "./AddListButton"
import List from "./List"

const ListsContainer: React.FC = () => {
  const projectId = useGetIntUrl("projectId")
  const { data, loading } = useListsQuery({
    skip: projectId === -1,
    variables: { projectId },
  })

  if (loading) {
    return (
      <Wrap>
        <Skeleton height="20rem" />
        <Skeleton height="20rem" />
        <Skeleton height="20rem" />
        <Skeleton height="20rem" />
        <Skeleton height="20rem" />
      </Wrap>
    )
  }

  if (!data) {
    return (
      <Flex py="6">
        <AddListButton projectId={projectId} />
      </Flex>
    )
  }

  return (
    <Flex
      py="6"
      flexWrap="nowrap"
      overflowX="auto"
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
      {data.lists
        .filter((list) => list.archived !== true)
        .map((list) => (
          <List key={list.id} list={list} />
        ))}
      <AddListButton projectId={projectId} />
    </Flex>
  )
}

export default ListsContainer
