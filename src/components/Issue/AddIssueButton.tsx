import { PlusSquareIcon } from "@chakra-ui/icons"
import { Button, Flex, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"

interface AddIssueButtonProps {
  listId: number
}

const AddIssueButton: React.FC<AddIssueButtonProps> = ({ listId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleSubmit = () => {
    if (value) {
      console.log("submiting: ", value)
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
    <Flex height="8" minW="100%" borderRadius="base">
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
