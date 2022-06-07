import ArtistHome from "./ArtistHome";
import { renderWithRouter, artist, tracks, albums } from "../testUtils";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";

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
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
    })

    it("renders an error message on errors with GetArtist function", async () => {
        mockGetArtist.mockRejectedValue({})
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })
        await act(async () => {
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders an error message on errors with GetArtistTopTracks function", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockRejectedValue({})
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })
        await act(async () => {
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders an error message on errors with GetArtistAlbums", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockRejectedValue({})

        await act(async () => {
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders loading component when the data is loading", async () => {
        mockGetArtist.mockReturnValue(new Promise(() => { }))
        mockGetArtistTopTracks.mockReturnValue(new Promise(() => { }))
        mockGetArtistAlbums.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
        await waitFor(() => {
            screen.getByRole("progressbar")
        })
    })

    it("renders the artist data", async () => {
        mockGetArtist.mockResolvedValue(artist)
        mockGetArtistTopTracks.mockResolvedValue(tracks)
        mockGetArtistAlbums.mockResolvedValue({
            items: albums
        })

        await act(async () => {
            await renderWithRouter(<ArtistHome />, { route: "/artist/:artistId" })
        })
        await waitFor(() => {
            screen.getByText(/Harry Styles/i)
        })
        await waitFor(() => {
            screen.getByText(/As It Was/i)
        })
        await waitFor(() => {
            screen.getByText(/Harry's House/i)
        })
        await waitFor(() => {
            screen.getByText(/Matilda/i)
        })
    })
})


