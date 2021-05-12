import { DropResult } from "react-beautiful-dnd"
import {
  useUpdateListOrderMutation,
  useUpdateIssueOrderMutation,
} from "../generated/graphql"
import { isPositionChanged } from "../utils/draggablesUtils"
import {
  updateCachedListOrder,
  updateCachedIssueOrder,
} from "../utils/handleUpdateOrders"

const useDragContext = () => {
  const [updateListOrder] = useUpdateListOrderMutation()
  const [updateIssueOrder] = useUpdateIssueOrderMutation()

  return (result: DropResult, projectId: number) => {
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
}

export default useDragContext
