import WrappedSongHome from "./WrappedSongHome"
import { renderWithRouter, track, artist, album, track2 } from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/dom";

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

    it("renders a play button when the user can play the song", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockResolvedValue(artist)
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })

        screen.getByText(/Play/i)
    })

    it("renders a message when the user can‘t play the song", async () => {
        mockGetTrack.mockResolvedValue(track2)
        mockGetArtist.mockResolvedValue(artist)
        mockGetAlbum.mockResolvedValue(album)

        await act(async () => {
            await renderWithRouter(<WrappedSongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })

        screen.getByText(/This song isn‘t available/i)
    })
})