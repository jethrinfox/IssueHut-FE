import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = (customRoute?: string): void => {
  const { data, loading } = useMeQuery()
  const router = useRouter()
  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.replace("/login?next=" + router.pathname)
      } else if (customRoute) {
        router.replace(customRoute)
      }
    }
  }, [loading, data, router, customRoute])
}
