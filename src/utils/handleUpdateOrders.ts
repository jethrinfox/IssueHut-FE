import { ApolloCache, gql } from "@apollo/client"
import { DropResult } from "react-beautiful-dnd"
import {
  IssueDocument,
  IssueQuery,
  IssuesDocument,
  IssuesQuery,
  ListsDocument,
  ListsQuery,
  RegularIssueFragment,
  UpdateIssueOrderMutation,
  UpdateListOrderMutation,
} from "../generated/graphql"
import { updateOrder } from "./draggablesUtils"

export const updateCachedListOrder = (
  cache: ApolloCache<UpdateListOrderMutation>,
  result: DropResult,
  projectId: number,
): void => {
  const lists = cache.readQuery<ListsQuery>({
    query: ListsDocument,
    variables: { projectId },
  })
  if (!lists) return

  const newOrderLists = updateOrder(lists.lists, result)

  cache.writeQuery<ListsQuery>({
    query: ListsDocument,
    variables: { projectId },
    data: { lists: [...newOrderLists], __typename: "Query" },
  })
}

export const updateCachedIssueOrder = (
  cache: ApolloCache<UpdateIssueOrderMutation>,
  result: DropResult,
  projectId: number,
): void => {
  const lists = cache.readQuery<ListsQuery>({
    query: ListsDocument,
    variables: { projectId },
  })
  if (!lists) return

  let list: ListsQuery["lists"][0]

  lists.lists.forEach((item) => {
    const listWithIssue = item.issues.find(
      (issue) => issue.id === Number(result.draggableId),
    )

    if (listWithIssue) {
      list = item
    }
  })

  if (!list) return

  const newOrderIssues = updateOrder(list.issues, result)

  console.log("🚀 ~ list", list)

  newOrderIssues.forEach((issue) => {
    cache.writeFragment<RegularIssueFragment>({
      id: "Issue:" + issue.id,
      fragment: gql`
        fragment _ on Issue {
          id
          order
        }
      `,
      data: { order: issue.order },
    })
  })

  // const issues = cache.readQuery<IssuesQuery>({
  //   query: IssuesDocument,
  //   variables: { listId: issue.issue?.listId },
  // })
  // if (!issues) return

  // cache.writeQuery<IssuesQuery>({
  //   query: IssueDocument,
  //   variables: { listId: issue.issue?.listId },
  //   data: { issues: [...newOrderIssues], __typename: "Query" },
  // })
}
