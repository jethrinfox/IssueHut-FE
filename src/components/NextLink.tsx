import { PropsWithChildren } from "react"
import Link, { LinkProps } from "next/link"
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"

export type NextLinkProps = PropsWithChildren<
  LinkProps & Omit<ChakraLinkProps, "as">
>

const NextLink: React.FC<NextLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}) => {
  return (
    <Link
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </Link>
  )
}

export default NextLink
