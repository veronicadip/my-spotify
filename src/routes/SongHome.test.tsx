import SongHome from "./SongHome";
import { renderWithRouter, track, artist } from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/dom";

const mockGetTrack = jest.fn();
const mockGetArtist = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
    SpotifyWebApi: function () {
        return { setAccessToken: jest.fn(), tracks: { getTrack: mockGetTrack }, artists: { getArtist: mockGetArtist } }
    }
}))

describe("<SongHome>", function () {
    beforeEach(() => {
        mockGetTrack.mockClear();
        mockGetArtist.mockClear();
    })

    it("renders without crashing", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<SongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
    })

    it("renders an error message on errors with getTrack function", async () => {
        mockGetTrack.mockRejectedValue({})
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<SongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with getArtist function", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockRejectedValue({})

        await act(async () => {
            await renderWithRouter(<SongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders loading component when the data is loading", async () => {
        mockGetTrack.mockReturnValue(new Promise(() => { }))
        mockGetArtist.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderWithRouter(<SongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByRole("progressbar")
    })

    it("renders the song data", async () => {
        mockGetTrack.mockResolvedValue(track)
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<SongHome />, { route: "/artist/:artistId/album/:albumId/song/:songId" })
        })
        screen.getByText(/As It Was/i)
        screen.getByText(/Harry Styles/i)
        screen.getByText(/More of: Harry's House/i)
    })
})