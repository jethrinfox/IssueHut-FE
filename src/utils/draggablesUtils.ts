import { DraggableLocation } from "react-beautiful-dnd"

export const isPositionChanged = (
  destination: DraggableLocation | undefined,
  source: DraggableLocation | undefined,
): boolean => {
  if (!destination) return false
  const isSameList = destination.droppableId === source.droppableId
  const isSamePosition = destination.index === source.index
  return !isSameList || !isSamePosition
}

export const calculateIssueListPosition = (
  ...args: (number | DraggableLocation | undefined)[]
): number => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args)
  let position

  if (!prevIssue && !nextIssue) {
    position = 1
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1
  } else {
    position =
      prevIssue.listPosition +
      (nextIssue.listPosition - prevIssue.listPosition) / 2
  }
  return position
}

export const getAfterDropPrevNextIssue = (
  allIssues: any[],
  destination: { droppableId: any; index: number } | undefined,
  source: { droppableId: any } | undefined,
  droppedIssueId: undefined,
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId,
  )
  const droppedIssue = allIssues.find(
    (issue: { id: any }) => issue.id === droppedIssueId,
  )
  const isSameList = destination.droppableId === source.droppableId

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index,
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index,
      )

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  }
}

export const getSortedListIssues = (issues: any[], status: any) =>
  issues
    .filter((issue: { status: any }) => issue.status === status)
    .sort(
      (a: { listPosition: number }, b: { listPosition: number }) =>
        a.listPosition - b.listPosition,
    )
