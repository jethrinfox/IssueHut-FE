import { Box, Center, Container } from "@chakra-ui/layout"
import { NextPage } from "next"
import Header from "../Header"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {
  return (
    <Box display="flex" minHeight="100vh" flexDir="column">
      <Header />
      <Container
        flex="1"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Center>{children}</Center>
      </Container>
    </Box>
  )
}

export default AuthLayout
