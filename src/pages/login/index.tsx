import { FormControl } from "@chakra-ui/form-control"
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Heading,
  Input,
  Wrap,
} from "@chakra-ui/react"
import { NextPage } from "next"
import AuthLayout from "../../components/Layout/AuthLayout"

const Login: NextPage = () => {
  return (
    <AuthLayout>
      <Box>
        <Box as="form" maxWidth="16rem">
          <Heading align="center" marginBottom={4}>
            Login
          </Heading>
          <Wrap>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </Wrap>
          <Divider marginY={4} />
          <Button colorScheme="orange" type="submit">
            Login
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  )
}

export default Login
