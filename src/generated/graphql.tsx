import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type EmailInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type Issue = {
  __typename?: "Issue"
  id: Scalars["Float"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
  description: Scalars["String"]
  priority: Scalars["String"]
  archived: Scalars["Boolean"]
}

export type IssueInput = {
  name: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  priority?: Maybe<Scalars["String"]>
  archived?: Maybe<Scalars["Boolean"]>
}

export type List = {
  __typename?: "List"
  id: Scalars["Float"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
  archived: Scalars["Boolean"]
}

export type Mutation = {
  __typename?: "Mutation"
  register: UserResponse
  login: UserResponse
  logout: Scalars["Boolean"]
  createProject: Project
  updateProject: Project
  deleteProject: Scalars["Boolean"]
  createIssue: Issue
  updateIssue: Issue
  deleteIssue: Scalars["Boolean"]
  createList: List
  updateList: List
  deleteList: Scalars["Boolean"]
}

export type MutationRegisterArgs = {
  options: UsernameInput
}

export type MutationLoginArgs = {
  options: EmailInput
}

export type MutationCreateProjectArgs = {
  options: ProjectInput
}

export type MutationUpdateProjectArgs = {
  options: ProjectInput
  projectId: Scalars["Float"]
}

export type MutationDeleteProjectArgs = {
  projectId: Scalars["Float"]
}

export type MutationCreateIssueArgs = {
  options: IssueInput
  listId: Scalars["Int"]
}

export type MutationUpdateIssueArgs = {
  options: IssueInput
  issueId: Scalars["Int"]
}

export type MutationDeleteIssueArgs = {
  issueId: Scalars["Int"]
}

export type MutationCreateListArgs = {
  name: Scalars["String"]
  projectId: Scalars["Int"]
}

export type MutationUpdateListArgs = {
  archived: Scalars["Boolean"]
  name: Scalars["String"]
  listId: Scalars["Int"]
}

export type MutationDeleteListArgs = {
  listId: Scalars["Int"]
}

export type Project = {
  __typename?: "Project"
  id: Scalars["Float"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
  description: Scalars["String"]
  ownerId: Scalars["Float"]
  owner: User
}

export type ProjectInput = {
  name: Scalars["String"]
  description: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  ping: Scalars["String"]
  me?: Maybe<User>
  projects: Array<Project>
  project?: Maybe<Project>
  issues: Array<Issue>
  issue?: Maybe<Issue>
  lists: Array<List>
  list?: Maybe<List>
}

export type QueryProjectArgs = {
  id: Scalars["Int"]
}

export type QueryIssueArgs = {
  issueId: Scalars["Int"]
}

export type QueryListArgs = {
  listId: Scalars["Int"]
}

export type User = {
  __typename?: "User"
  id: Scalars["Float"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  username: Scalars["String"]
  email: Scalars["String"]
  displayName: Scalars["String"]
}

export type UserResponse = {
  __typename?: "UserResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UsernameInput = {
  email: Scalars["String"]
  username: Scalars["String"]
  password: Scalars["String"]
}

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email"
>

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>
  user?: Maybe<{ __typename?: "User" } & RegularUserFragment>
}

export type CreateProjectMutationVariables = Exact<{
  options: ProjectInput
}>

export type CreateProjectMutation = { __typename?: "Mutation" } & {
  createProject: { __typename?: "Project" } & Pick<
    Project,
    "id" | "name" | "description" | "createdAt"
  >
}

export type LoginMutationVariables = Exact<{
  options: EmailInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & RegularUserResponseFragment
}

export type LogOutMutationVariables = Exact<{ [key: string]: never }>

export type LogOutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>

export type RegisterMutationVariables = Exact<{
  options: UsernameInput
}>

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserFragment>
}

export type ProjectQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type ProjectQuery = { __typename?: "Query" } & {
  project?: Maybe<
    { __typename?: "Project" } & Pick<
      Project,
      "id" | "name" | "description" | "ownerId" | "createdAt" | "updatedAt"
    >
  >
}

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>

export type ProjectsQuery = { __typename?: "Query" } & {
  projects: Array<
    { __typename?: "Project" } & Pick<
      Project,
      "id" | "name" | "description" | "ownerId" | "createdAt" | "updatedAt"
    >
  >
}

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    email
  }
`
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`
export const CreateProjectDocument = gql`
  mutation CreateProject($options: ProjectInput!) {
    createProject(options: $options) {
      id
      name
      description
      createdAt
    }
  }
`
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument, options)
}
export type CreateProjectMutationHookResult = ReturnType<
  typeof useCreateProjectMutation
>
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>
export const LoginDocument = gql`
  mutation Login($options: EmailInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const LogOutDocument = gql`
  mutation LogOut {
    logout
  }
`
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options,
  )
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($options: UsernameInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const ProjectDocument = gql`
  query Project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options,
  )
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectQuery,
    ProjectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options,
  )
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>
export type ProjectQueryResult = Apollo.QueryResult<
  ProjectQuery,
  ProjectQueryVariables
>
export const ProjectsDocument = gql`
  query Projects {
    projects {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>
