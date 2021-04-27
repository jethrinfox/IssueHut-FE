import { DropResult } from "react-beautiful-dnd"

export const isPositionChanged = ({
  source,
  destination,
}: DropResult): boolean => {
  if (!destination) return false
  const isSameList = destination.droppableId === source.droppableId
  const isSamePosition = destination.index === source.index
  return !isSameList || !isSamePosition
}

export const updateOrder = (
  data: any,
  { source, destination, draggableId }: DropResult,
) => {
  const itemId = Number(draggableId)
  const prevItemOrder = source.index + 1
  const newItemOrder = destination!.index + 1
  const didMoveUp = source.index < destination!.index

  const newOrderMap = data.map((item: any) => {
    let itemNewPosition

    if (item.id === itemId) {
      itemNewPosition = newItemOrder
    } else if (
      didMoveUp &&
      item.order > prevItemOrder &&
      item.order <= newItemOrder
    ) {
      itemNewPosition = item.order - 1
    } else if (
      !didMoveUp &&
      item.order < prevItemOrder &&
      item.order >= newItemOrder
    ) {
      itemNewPosition = item.order + 1
    } else {
      itemNewPosition = item.order
    }

    return {
      ...item,
      order: itemNewPosition,
    }
  })

  return newItemOrder
}
