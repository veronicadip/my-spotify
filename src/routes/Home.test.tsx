import Home from "../routes/Home";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { renderWithRouter } from "../testUtils"
import { act } from "react-dom/test-utils";




it("renders without crashing", async () => {
    await act(async () => {
        jest.mock("spotify-web-api-ts", () => ({

        }))
        await renderWithRouter(<Home />);
    })
})
