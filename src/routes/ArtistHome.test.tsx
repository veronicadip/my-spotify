import ArtistHome from "./ArtistHome";
import { renderWithRouter, artist, tracks, albums } from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/dom";
import WrappedArtistHome from "./WrappedArtistHome";

const mockGetArtistAlbums = jest.fn();
const mockGetArtist = jest.fn();
const mockGetArtistTopTracks = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
    SpotifyWebApi: function () {
        return { artists: { getArtist: mockGetArtist, getArtistAlbums: mockGetArtistAlbums, getArtistTopTracks: mockGetArtistTopTracks }, setAccessToken: jest.fn() }
    }
}))

describe("<ArtistHome>", function () {
    beforeEach(() => {
        mockGetArtistAlbums.mockClear();
        mockGetArtist.mockClear();
        mockGetArtistTopTracks.mockClear()
    })
    it("renders without crashing", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })
        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
    })

    it("renders an error message on errors with GetArtist function", async () => {
        mockGetArtist.mockRejectedValue({})
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })
        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with GetArtistTopTracks function", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockRejectedValue({})
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })
        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with GetArtistAlbums", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockRejectedValue({})

        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders loading component when the data is loading", async () => {
        mockGetArtist.mockReturnValue(new Promise(() => { }))
        mockGetArtistTopTracks.mockReturnValue(new Promise(() => { }))
        mockGetArtistAlbums.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
        screen.getByRole("progressbar")
    })

    it("renders the artist data", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })

        await act(async () => {
            await renderWithRouter(<WrappedArtistHome />, { route: "/artist/:artistId" })
        })
        screen.getByText(/Harry Styles/i)
        screen.getByText(/As It Was/i)
        screen.getByText(/Harry's House/i)
        screen.getByText(/Matilda/i)
    })
})


