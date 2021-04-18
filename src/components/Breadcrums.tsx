import { Box } from "@chakra-ui/layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { FC } from "react"

interface BreadcrumsProps {
  breadcrums: Array<string | undefined>
}

const Breadcrums: FC<BreadcrumsProps> = ({ breadcrums }) => {
  return (
    <Box>
      <Breadcrumb>
        {breadcrums.map((breadcrum, idx) => {
          if (!breadcrum === undefined) return ""
          return (
            <BreadcrumbItem key={`${idx}-${breadcrum}`}>
              <BreadcrumbLink>{breadcrum}</BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>
    </Box>
  )
}

export default Breadcrums
