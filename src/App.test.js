import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders the health check route", () => {
  const { getByText } = render(<App />)
  const healthElement = getByText(/healthy/i)
  expect(healthElement).toBeInTheDocument()
})
