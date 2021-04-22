import { Wrap } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/skeleton"
import { FC } from "react"

const ListsSkeleton: FC = () => {
  return (
    <Wrap>
      <Skeleton height="30rem" />
      <Skeleton height="30rem" />
      <Skeleton height="30rem" />
      <Skeleton height="30rem" />
      <Skeleton height="30rem" />
    </Wrap>
  )
}
export default ListsSkeleton
