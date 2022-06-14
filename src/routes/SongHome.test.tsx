import SongHome from "./SongHome";
import WrappedSongHome from "./WrappedSongHome"
import { renderWithRouter, track, artist, album } from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

const mockGetAlbum = jest.fn();
const mockGetTrack = jest.fn();
const mockGetArtist = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
    SpotifyWebApi: function () {
        return { setAccessToken: jest.fn(), tracks: { getTrack: mockGetTrack }, artists: { getArtist: mockGetArtist }, albums: { getAlbum: mockGetAlbum } }
    }
}))

describe("<SongHome>", function () {
    beforeEach(() => {
        mockGetTrack.mockClear();
        mockGetArtist.mockClear();
        mockGetAlbum.mockClear();
    })

    it("renders without crashing", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockResolvedValue(artist)
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
    })

    it("renders an error message on errors with getTrack function", async () => {
        mockGetTrack.mockRejectedValue({})
        mockGetArtist.mockResolvedValue(artist)
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with getArtist function", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockRejectedValue({})
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders loading component when the data is loading", async () => {
        mockGetTrack.mockReturnValue(new Promise(() => { }))
        mockGetArtist.mockReturnValue(new Promise(() => { }))
        mockGetAlbum.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByRole("progressbar")
    })

    it("renders the song data", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockResolvedValue(artist)
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/As It Was/i)
        screen.getByText(/Harry Styles/i)
        screen.getByText(/More of: Harry's House/i)
    })

    // it("plays the song when you click the play button", async () => {
    //     mockGetTrack.mockResolvedValue(track)
    //     mockGetArtist.mockResolvedValue(artist)
    //     mockGetAlbum.mockResolvedValue(album)

    //     await act(async () => {
    //         await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
    //     })

    //     await act(async () => {
    //         userEvent.click(screen.getByRole("button"))
    //     })

    //     await waitFor(() => {
    //         screen.getByText(/0:29/i)
    //     })

    // })
})

// it("renders loading component when the data is loading", async () => {
//     mockSearch.mockReturnValue(new Promise(() => { }));

//     await act(async () => {
//       await renderWithRouter(<Home />);
//     });

//     await act(async () => {
//       userEvent.type(screen.getByRole("textbox"), "x");
//     });

//     await waitFor(() => {
//       screen.getByRole("progressbar");
//     });
//   });