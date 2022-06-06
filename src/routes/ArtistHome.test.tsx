import ArtistHome from "./ArtistHome";
import { renderArtistHomeWithRouter } from "../testUtils";
import { act } from "react-dom/test-utils";

const mockGetArtistAlbums = jest.fn();
const mockGetArtist = jest.fn();
const mockGetArtistTopTracks = jest.fn();

jest.mock("spotify-web-api-ts", () => ({
    SpotifyWebApi: function () {
        return { artists: { getArtist: mockGetArtist, getArtistAlbums: mockGetArtistAlbums, getArtistTopTracks: mockGetArtistTopTracks }, setAccessToken: jest.fn() }
    }
}))

// describe("<ArtistHome>", function () {
//     beforeEach(() => {
//         mockGetArtistAlbums.mockClear();
//         mockGetArtist.mockClear();
//         mockGetArtistTopTracks.mockClear()
//     })
// })

it("renders without crashing", async () => {
    mockGetArtist.mockResolvedValue({
        followers: { total: 22222 },
        id: "asd",
        images: [],
        name: "Oasis"
    })
    mockGetArtistTopTracks.mockResolvedValue([
        {}
    ])
    mockGetArtistAlbums.mockResolvedValue({
        items: []
    })
    await act(async () => {
        await renderArtistHomeWithRouter(<ArtistHome />)
    })
})