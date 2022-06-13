import AlbumHome from "./AlbumHome";
import { renderWithRouter, album, albums, artist } from "../testUtils";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/dom";

const mockGetAlbum = jest.fn();
const mockGetArtistAlbums = jest.fn();
const mockGetArtist = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
    SpotifyWebApi: function () {
        return { setAccessToken: jest.fn(), albums: { getAlbum: mockGetAlbum }, artists: { getArtistAlbums: mockGetArtistAlbums, getArtist: mockGetArtist } }
    }
}))

describe("<AlbumHome>", function () {
    beforeEach(() => {
        mockGetAlbum.mockClear();
        mockGetArtistAlbums.mockClear();
        mockGetArtist.mockClear()
    })

    it("renders without crashing", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
    })

    it("renders an error message on errors with getAlbum function", async () => {
        mockGetAlbum.mockRejectedValue({})
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with getArtistAlbums function", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockRejectedValue({})
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders an error message on errors with getArtist", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockRejectedValue({})

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
        screen.getByText(/There was an error loading the data, please try again./i)
    })

    it("renders loading component when the data is loading", async () => {
        mockGetAlbum.mockReturnValue(new Promise(() => { }))
        mockGetArtistAlbums.mockReturnValue(new Promise(() => { }))
        mockGetArtist.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
        screen.getByRole("progressbar")
    })

    it("renders the album data", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderWithRouter(<AlbumHome />, { route: "/artist/:artistId/album/:albumId" })
        })
        screen.getAllByText(/Harry's House/i)
        screen.getByText(/1. As It Was/i)
        screen.getByText(/3:38/i)
        screen.getAllByText(/Harry Styles/i)
        screen.getByText(/More albums by Harry Styles/i)
    })
})