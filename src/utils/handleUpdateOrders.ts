import { DropResult } from "react-beautiful-dnd"
import { UpdateListOrderMutationHookResult } from "../generated/graphql"

export const handleUpdateListOrder = (
  result: DropResult,
  updateList: UpdateListOrderMutationHookResult[0],
) => {
  updateList({
    variables: {
      options: {
        id: Number(result.draggableId),
        order: result.destination!.index + 1,
      },
    },
  })
}
