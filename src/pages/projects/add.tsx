import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Heading } from "@chakra-ui/layout"
import { Form, Formik } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { InputField } from "components//InputField"
import Layout from "components//Layout"
import NextLink from "components//NextLink"
import { useCreateProjectMutation } from "generated//graphql"
import { useIsAuth } from "hooks//useIsAuth"

const AddProjectPage: NextPage = () => {
  useIsAuth()

  const [createProject] = useCreateProjectMutation()
  const router = useRouter()

  return (
    <Layout>
      <Center>
        <Box
          maxW="container.sm"
          width="100%"
          marginTop="3rem"
          display="flex"
          flexDir="column"
        >
          <Heading marginBottom="2rem">Add Project</Heading>
          <Box>
            <Formik
              initialValues={{ name: "", description: "" }}
              onSubmit={async (values) => {
                await createProject({
                  variables: { options: values },
                  update: (cache) => {
                    cache.evict({ fieldName: "projects:{}" })
                  },
                })
                router.push("/")
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="name" label="Name" type="text" />
                  <Box mt={4}>
                    <InputField
                      textarea
                      name="description"
                      label="Description"
                      type="text"
                    />
                  </Box>
                  <Flex justifyContent="flex-end">
                    <Box mt={2}>
                      <NextLink href="/forgot-password">
                        forgot password?
                      </NextLink>
                    </Box>
                  </Flex>
                  <Button
                    type="submit"
                    colorScheme="orange"
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Create Project
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Center>
    </Layout>
  )
}

export default AddProjectPage
