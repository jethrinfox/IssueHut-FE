import Layout from "components/Layout"
import { useIsAuth } from "hooks/useIsAuth"
import { NextPage } from "next"

const IndexPage: NextPage = () => {
  useIsAuth("/projects/")

  return <Layout></Layout>
}

export default IndexPage
