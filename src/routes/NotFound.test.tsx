import { act } from "@testing-library/react";
import NotFound from "./NotFound";
import { renderNotFoundWithRouter } from "../testUtils";
import { waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";

it("renders without crashing", async () => {
    await act(async () => {
        await renderNotFoundWithRouter(<NotFound />)
    })
})

it("renders the not matches message", async () => {
    await act(async () => {
        await renderNotFoundWithRouter(<NotFound />)
    })
    await waitFor(() => {
        screen.getByText(/Error 404, page not found./i)
    })
    await waitFor(() => {
        screen.getByText(/Go Home/i)
    })
})