import { useRouter } from "next/router"

export const useGetIntUrl = (queryName: string): number => {
  const router = useRouter()
  const queryParam = router.query[queryName]
  const intQuery = typeof queryParam === "string" ? parseInt(queryParam) : -1
  return intQuery
}
