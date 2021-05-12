import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { FC, useEffect, useRef } from "react"

interface CustomAlertProps {
  open: boolean
  handleAction: (confirm: boolean) => void
  header: string
  body: string
}

const CustomAlert: FC<CustomAlertProps> = ({
  body,
  header,
  open,
  handleAction,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open, onOpen])

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={() => {
              handleAction(false)
              onClose()
            }}
          >
            Cancel
          </Button>
          <Button
            onCLick={() => {
              handleAction(true)
              onClose()
            }}
            colorScheme="red"
            ml={3}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlert
