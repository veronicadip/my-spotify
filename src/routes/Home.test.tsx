import Home from "../routes/Home";
import { renderWithRouter, artists, albums, tracks, album } from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

const mockSearch = jest.fn();
const mockGetAlbum = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
  SpotifyWebApi: function () {
    return { search: { search: mockSearch }, setAccessToken: jest.fn(), albums: { getAlbum: mockGetAlbum } };
  },
}));

describe("<Home>", function () {
  beforeEach(() => {
    mockSearch.mockClear();
    mockGetAlbum.mockClear();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      await renderWithRouter(<Home />);
    });
  });

  it("renders an empty message when no song results are found", async () => {
    mockSearch.mockResolvedValue({
      albums: { items: [] },
      artists: { items: [] },
      tracks: { items: [] },
    });
    mockGetAlbum.mockResolvedValue(album)

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "zzxcvpo");
    });

    await waitFor(() =>
      screen.getByText(/There aren't any songs with the name "zzxcvpo"/i)
    );
  });

  it("renders an empty message when no album results are found", async () => {
    mockSearch.mockResolvedValue({
      albums: { items: [] },
      artists: { items: [] },
      tracks: { items: [] },
    });
    mockGetAlbum.mockResolvedValue(album)

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "zzxcvpo");
    });

    await waitFor(() => {
      screen.getByText(/There aren't any albums with the name "zzxcvpo"/i);
    });
  });

  it("renders an empty message when no artist results are found", async () => {
    mockSearch.mockResolvedValue({
      albums: { items: [] },
      artists: { items: [] },
      tracks: { items: [] },
    });
    mockGetAlbum.mockResolvedValue(album)

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "zzxcvpo");
    });

    await waitFor(() => {
      screen.getByText(/There aren't any artists with the name "zzxcvpo"/i);
    });
  });

  it("renders an error message on errors", async () => {
    mockSearch.mockRejectedValue({});
    mockGetAlbum.mockRejectedValue({})

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "x");
    });

    await waitFor(() => {
      screen.getByText(
        /There was an error loading the data, please try again./i
      );
    });
  });

  it("renders results", async () => {
    mockSearch.mockResolvedValue({
      albums: { items: albums },
      artists: { items: artists },
      tracks: { items: tracks }
    });
    mockGetAlbum.mockResolvedValue(album)

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "Harry");
    });

    await waitFor(() => {
      screen.getByText(/Harry's House/i);
    });

    await waitFor(() => {
      screen.getAllByAltText(/Harry Styles/i)
    });

    await waitFor(() => {
      screen.getByText(/As It Was/i)
    })
  });

  it("renders loading component when the data is loading", async () => {
    mockSearch.mockReturnValue(new Promise(() => { }));
    mockGetAlbum.mockReturnValue(new Promise(() => { }))

    await act(async () => {
      await renderWithRouter(<Home />);
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "x");
    });

    await waitFor(() => {
      screen.getByRole("progressbar");
    });
  });

  it("renders a welcome message before the user make a search", async () => {
    await act(async () => {
      await renderWithRouter(<Home />)
    })

    screen.getByText(/Search here the music that you want!/i)
  })

  it("renders a play button in each song that is playable", async () => {
    mockSearch.mockResolvedValue({
      albums: { items: albums },
      artists: { items: artists },
      tracks: { items: tracks }
    });
    mockGetAlbum.mockResolvedValue(album)

    await act(async () => {
      await renderWithRouter(<Home />)
    })
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "Harry");
    });

    await waitFor(() => {
      screen.getByText(/Play/i)
    })
    await waitFor(() => {
      screen.getByText(/This song isn‘t available/i)
    })
  })
});

