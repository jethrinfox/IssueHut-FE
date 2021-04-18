import { useProjectQuery } from "../generated/graphql"
import { useGetIntUrl } from "./useGetIntUrl"

const useGetProjectFromQuery = () => {
  const projectId = useGetIntUrl("projectId")

  return useProjectQuery({
    variables: { id: projectId },
    skip: projectId === -1,
  })
}

export default useGetProjectFromQuery
