import AlbumHome from "./AlbumHome";
import { renderAlbumHomeWithRouter, album, albums, artist } from "../testUtils";
import { act, waitFor } from "@testing-library/react";
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
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
    })

    it("renders an error message on errors with getAlbum function", async () => {
        mockGetAlbum.mockRejectedValue({})
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders an error message on errors with getArtistAlbums function", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockRejectedValue({})
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders an error message on errors with getArtist", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockRejectedValue({})

        await act(async () => {
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
        await waitFor(() => {
            screen.getByText(/There was an error loading the data, please try again./i)
        })
    })

    it("renders loading component when the data is loading", async () => {
        mockGetAlbum.mockReturnValue(new Promise(() => { }))
        mockGetArtistAlbums.mockReturnValue(new Promise(() => { }))
        mockGetArtist.mockReturnValue(new Promise(() => { }))

        await act(async () => {
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
        await waitFor(() => {
            screen.getByRole("progressbar")
        })
    })

    it("renders the album data", async () => {
        mockGetAlbum.mockResolvedValue(album)
        mockGetArtistAlbums.mockResolvedValue({ items: albums })
        mockGetArtist.mockResolvedValue(artist)

        await act(async () => {
            await renderAlbumHomeWithRouter(<AlbumHome />)
        })
        await waitFor(() => {
            screen.getAllByText(/Harry's House/i)
        })
        await waitFor(() => {
            screen.getByText(/1. As It Was/i)
        })
        await waitFor(() => {
            screen.getByText(/3:38/i)
        })
        await waitFor(() => {
            screen.getAllByText(/Harry Styles/i)
        })
        await waitFor(() => {
            screen.getByText(/More albums by Harry Styles/i)
        })
    })
})