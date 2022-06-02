import Home from "../routes/Home";
import { renderWithRouter } from "../testUtils";
import { act } from "react-dom/test-utils";
import SpotifyWebApi from "spotify-web-api-js";

jest.mock("spotify-web-api-ts");

describe("<Home>", function () {
  const searchMock = jest.fn();

  jest.spyOn(SpotifyWebApi.prototype, "search").mockReturnValue({
    search: searchMock,
  });

  beforeEach(() => {
    searchMock.mockClear();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      await renderWithRouter(<Home />);
    });
  });

  it("renders an empty message when no results are found", async () => {
    searchMock.mockResolvedValue({ albums: [], artists: [], tracks: [] });

    await act(async () => {
      await renderWithRouter(<Home />);
      // TODO: check message when empty
    });
  });

  it("renders an error message on errors", async () => {
    searchMock.mockRejectedValue({});

    await act(async () => {
      await renderWithRouter(<Home />);
      // TODO: check error message
    });
  });

  it("renders results", async () => {
    searchMock.mockResolvedValue({
      albums: [],
    });

    await act(async () => {
      await renderWithRouter(<Home />);
    });
  });
});
