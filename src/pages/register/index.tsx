import { Button } from "@chakra-ui/button"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC } from "react"
import { InputField } from "components//InputField"
import AuthLayout from "components//Layout/AuthLayout"
import NextLink from "components//NextLink"
import { MeDocument, MeQuery, useRegisterMutation } from "generated//graphql"
import { toErrorMap } from "utils/toErrorMap"

export const Register: FC = () => {
  const [register] = useRegisterMutation()
  const router = useRouter()

  return (
    <AuthLayout>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              })
            },
          })
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
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
            <Heading size="md" color="gray.700" marginBottom="4">
              Register
            </Heading>
            <InputField name="email" label="Email" type="email" />
            <Box mt={4}>
              <InputField name="username" label="Username" type="text" />
            </Box>
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default Register
