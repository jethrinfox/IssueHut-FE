import { PlusSquareIcon } from "@chakra-ui/icons"
import { Button, Flex, Input } from "@chakra-ui/react"
import gql from "graphql-tag"
import { ChangeEvent, useState } from "react"
import {
  ListsDocument,
  ListsQuery,
  RegularIssueFragment,
  RegularListFragment,
  useCreateIssueMutation,
} from "../../generated/graphql"

interface AddIssueButtonProps {
  listId: number
}

const AddIssueButton: React.FC<AddIssueButtonProps> = ({ listId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")
  const [createIssue] = useCreateIssueMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleSubmit = () => {
    if (value) {
      createIssue({
        variables: {
          listId,
          options: {
            name: value,
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          createIssue: {
            __typename: "Issue",
            id: -1,
            name: value,
            order: 100,
            archived: false,
            listId,
            createdAt: Date(),
            updatedAt: Date(),
            priority: "medium",
          },
        },
        // update: (cache, { data }) => {

        // },
      })
    }
    handleClose()
  }

  const handleKeyPress = (event: any) => {
    if (event?.charCode === 13) {
      handleSubmit()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setValue("")
  }

  return (
    <Flex marginBottom={2} height="8" minW="100%" borderRadius="base">
      {!isOpen ? (
        <Button
          flex="1"
          onClick={() => setIsOpen(true)}
          aria-label="add issue"
          colorScheme="gray"
          color="gray.500"
        >
          <Flex justifyContent="center" alignItems="center">
            <PlusSquareIcon fontSize="20" marginRight="2" />
            Añadir un issue
          </Flex>
        </Button>
      ) : (
        <Flex as="form" onSubmit={handleSubmit}>
          <Input
            autoFocus
            onKeyPress={handleKeyPress}
            onBlur={handleSubmit}
            marginBottom="6"
            value={value}
            onChange={handleChange}
            placeholder="Add your issue name"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default AddIssueButton
