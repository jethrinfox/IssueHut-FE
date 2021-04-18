import { Box, Flex, Heading } from "@chakra-ui/layout"
import { List as ListType } from "../../../generated/graphql"
import IssuesContainer from "./IssuesContainer"

interface ListProps {
  list: ListType
}

const List: React.FC<ListProps> = ({ list }) => {
  const { name, issues } = list

  return (
    <Box
      minH="40"
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
    >
      <Heading size="md">{name}</Heading>
      <Flex flexDir="column" width="100%">
        <IssuesContainer issues={issues} />
      </Flex>
    </Box>
  )
}

export default List
