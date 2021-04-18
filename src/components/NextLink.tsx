import { PropsWithChildren } from "react"
import Link, { LinkProps } from "next/link"
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"

export type NextLinkProps = PropsWithChildren<
  Omit<LinkProps, "as"> & ChakraLinkProps
>

const NextLink: React.FC<NextLinkProps> = ({
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  as = "a",
  ...chakraProps
}) => {
  return (
    <Link
      passHref={true}
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink as={as} {...chakraProps}>
        {children}
      </ChakraLink>
    </Link>
  )
}

export default NextLink
