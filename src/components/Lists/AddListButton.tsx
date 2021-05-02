import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { ListsDocument, useCreateListMutation } from "generated//graphql"

interface AddListButtonProps {
  projectId: number
}

const AddListButton: React.FC<AddListButtonProps> = ({ projectId }) => {
  const [createList] = useCreateListMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleClick = async () => {
    await createList({
      variables: { name: value, projectId },
      refetchQueries: [
        {
          query: ListsDocument,
          variables: { projectId },
        },
      ],
    })
    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    setValue("")
  }

  return (
    <Box
      height="40"
      width="52"
      bg="gray.100"
      borderRadius="base"
      boxShadow="md"
      flex="0 0 auto"
    >
      {!isOpen ? (
        <IconButton
          onClick={() => setIsOpen(true)}
          aria-label="add list"
          height="100%"
          width="100%"
          icon={<PlusSquareIcon fontSize="30" color="white" />}
        />
      ) : (
        <Flex
          height="100%"
          width="100%"
          flexDir="column"
          justifyContent="center"
        >
          <Input
            marginBottom="6"
            value={value}
            onChange={handleChange}
            placeholder="Add your list name"
          />
          <Flex justifyContent="space-around">
            <IconButton
              onClick={handleClose}
              colorScheme="red"
              aria-label="close add list"
              icon={<DeleteIcon fontSize="30" color="white" />}
            />
            <IconButton
              colorScheme="green"
              onClick={handleClick}
              disabled={value === ""}
              aria-label="confirm add list"
              icon={<PlusSquareIcon fontSize="30" color="white" />}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default AddListButton
