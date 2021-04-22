import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { FC } from "react"

interface BreadcrumsProps {
  breadcrums: Array<string | undefined>
}

const Breadcrums: FC<BreadcrumsProps> = ({ breadcrums }) => {
  return (
    <Breadcrumb color="GrayText">
      {breadcrums.map((breadcrum, idx) => {
        if (!breadcrum === undefined) return ""
        return (
          <BreadcrumbItem key={`${idx}-${breadcrum}`}>
            <BreadcrumbLink>{breadcrum}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrums
