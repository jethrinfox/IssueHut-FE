import { Box, Container } from "@chakra-ui/layout"
import { NextPage } from "next"
import Header from "../Header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" height="100vh" flexDir="column" overflow="hidden">
      <Header />
      <Box
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "12px",
            borderRadius: "6px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "6px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
      >
        <Container
          maxW="container.xl"
          flex="1"
          display="flex"
          flexDir="column"
          py="2"
          px="6"
        >
          <Box>{children}</Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
