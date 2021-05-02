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

interface Item {
  id: number
  order: number
}

export function updateOrder<T extends Item>(
  items: T[],
  result: DropResult,
): T[] {
  const { source, destination, draggableId } = result

  const itemId = Number(draggableId)
  const prevItemOrder = source.index + 1
  const newItemOrder = destination!.index + 1
  const didMoveUp = source.index < destination!.index

  const newOrderMap = items.map((item) => {
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

  return newOrderMap
}
