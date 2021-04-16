import { Box, Container } from "@chakra-ui/layout"
import { NextPage } from "next"
import Header from "../Header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" minHeight="100vh" flexDir="column">
      <Header />
      <Container maxW="container.lg" flex="1" display="flex" flexDir="column">
        <Box>{children}</Box>
      </Container>
    </Box>
  )
}

export default Layout
