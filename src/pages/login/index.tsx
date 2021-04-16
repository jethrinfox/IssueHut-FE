import { Button } from "@chakra-ui/button"
import { Box, Flex } from "@chakra-ui/layout"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC } from "react"
import { InputField } from "../../components/InputField"
import AuthLayout from "../../components/Layout/AuthLayout"
import NextLink from "../../components/NextLink"
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql"
import { toErrorMap } from "../../utils/toErrorMap"

export const LoginPage: FC = () => {
  const [login] = useLoginMutation()
  const router = useRouter()

  return (
    <AuthLayout>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              })
            },
          })
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            // logged in
            if (typeof router.query.next === "string") {
              router.push(router.query.next)
            } else {
              router.push("/")
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" label="Email" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Flex justifyContent="flex-end">
              <Box mt={2}>
                <NextLink href="/forgot-password">forgot password?</NextLink>
              </Box>
            </Flex>
            <Button
              type="submit"
              colorScheme="orange"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default LoginPage
