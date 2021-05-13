// test-utils.js
import { ChakraProvider } from "@chakra-ui/react"
import { render, RenderOptions, RenderResult } from "@testing-library/react"
import { FC, JSXElementConstructor, ReactElement } from "react"
import theme from "../utils/theme"

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers: FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options: RenderOptions = {},
): RenderResult => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
