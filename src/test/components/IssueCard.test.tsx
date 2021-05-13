import { fireEvent } from "@testing-library/dom"
import IssueCard from "components/Issue/IssueCard"
import { render, screen } from "test/test-utils"

describe("renders an issue card", () => {
  const onOpen = jest.fn()

  it("render properly", () => {
    render(
      <IssueCard
        issue={{
          id: 1,
          archived: false,
          name: "This is an issue",
          order: 1,
          priority: "medium",
        }}
        onOpen={onOpen}
      />,
    )
    const title = screen.getByText("This is an issue")
    expect(title).toBeInTheDocument()
    expect(title.textContent).toEqual("This is an issue")
  })

  it("let you click on the title", () => {
    render(
      <IssueCard
        issue={{
          id: 1,
          archived: false,
          name: "This is an issue",
          order: 1,
          priority: "medium",
        }}
        onOpen={onOpen}
      />,
    )

    const title = screen.getByText("This is an issue")

    fireEvent.click(title)

    expect(onOpen).toBeCalled()
    expect(onOpen).toBeCalledTimes(1)
  })
})
