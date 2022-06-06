import ArtistHome from "./ArtistHome";
import { renderArtistHomeWithRouter, artist, tracks, albums } from "../testUtils";
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
})

it("renders without crashing", async () => {
    mockGetArtist.mockResolvedValue(artist)
    mockGetArtistTopTracks.mockResolvedValue(tracks)
    mockGetArtistAlbums.mockResolvedValue({
        items: albums
    })
    await act(async () => {
        await renderArtistHomeWithRouter(<ArtistHome />)
    })
})

it("renders an error message on errors with GetArtist function", async () => {
    mockGetArtist.mockRejectedValue({})
    mockGetArtistTopTracks.mockResolvedValue(tracks)
    mockGetArtistAlbums.mockResolvedValue({
        items: albums
    })
    await act(async () => {
        await renderArtistHomeWithRouter(<ArtistHome />)
    })
    await waitFor(() => {
        screen.getByText(/There was an error loading the data, please try again./i)
    })
})
