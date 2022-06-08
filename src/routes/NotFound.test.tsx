import { act } from "@testing-library/react";
import NotFound from "./NotFound";
import { renderWithRouter } from "../testUtils";
import { screen } from "@testing-library/dom";

it("renders without crashing", async () => {
    await act(async () => {
        await renderWithRouter(<NotFound />, { route: "/falseroute/route" })
    })
})

it("renders the not matches message", async () => {
    await act(async () => {
        await renderWithRouter(<NotFound />, { route: "/falseroute/route" })
    })
    screen.getByText(/Error 404, page not found./i)
    screen.getByText(/Go Home/i)
})