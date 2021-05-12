import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, RefObject } from "react"
import {
  ProjectQuery,
  ProjectsDocument,
  ProjectsQuery,
  useCreateProjectMutation,
  useMeQuery,
} from "../../generated/graphql"
import { isServer } from "../../utils/isServer"
import { InputField } from "../InputField"
import NextLink from "../NextLink"

interface AddProjectDrawerProps {
  isOpen: boolean
  onClose: () => void
  btnRef: RefObject<HTMLButtonElement>
}

const AddProjectDrawer: FC<AddProjectDrawerProps> = ({
  isOpen,
  onClose,
  btnRef,
}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  })
  const [createProject] = useCreateProjectMutation()
  const router = useRouter()

  if (loading) return null

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new Project</DrawerHeader>

          <Formik
            initialValues={{ name: "", description: "" }}
            onSubmit={async (values) => {
              await createProject({
                variables: { options: values },
                optimisticResponse: {
                  __typename: "Mutation",
                  createProject: {
                    __typename: "Project",
                    id: -1,
                    name: values.name,
                    description: values.description,
                    updatedAt: Date(),
                    createdAt: Date(),
                    ownerId: data!.me!.id!,
                  },
                },
                update: (cache, { data }) => {
                  if (data) {
                    const projects = cache.readQuery<ProjectsQuery>({
                      query: ProjectsDocument,
                    })

                    if (projects) {
                      cache.writeQuery<ProjectsQuery>({
                        query: ProjectsDocument,
                        data: {
                          __typename: "Query",
                          projects: [...projects.projects, data.createProject],
                        },
                      })
                    }
                  }
                },
              })
              onClose()
              router.push("/")
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <DrawerBody>
                  <InputField autoFocus name="name" label="Name" type="text" />
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
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="orange"
                    isLoading={isSubmitting}
                  >
                    Create Project
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddProjectDrawer
