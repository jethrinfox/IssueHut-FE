import { Box, Wrap } from "@chakra-ui/layout"
import { FC } from "react"
import NextLink from "./NextLink"

const Header: FC = () => {
  return (
    <Box
      height="54px"
      width="100%"
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Wrap>
        <NextLink href="/">Home</NextLink>
        <NextLink href="/login">login</NextLink>
        <NextLink href="/register">register</NextLink>
      </Wrap>
    </Box>
  )
}

export default Header
