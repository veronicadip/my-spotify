import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { Album } from "spotify-web-api-ts/types/types/SpotifyObjects";

export const renderWithRouter = async (
    component: JSX.Element,
    { route = "/" } = {}
) => {
    window.history.pushState({}, "Test page", route);
    return render(component, { wrapper: BrowserRouter });
};

export const artist = {
    followers: {
        total: 2100000,
    },
    id: "00000aaaasdasd",
    images: [
        {
            url: "https://i.scdn.co/image/ab6761610000e5ebf7db7c8ede90a019c54590bb",
        },
        {
            url: "https://i.scdn.co/image/ab67616100005174f7db7c8ede90a019c54590bb",
        },
        {
            url: "https://i.scdn.co/image/ab6761610000f178f7db7c8ede90a019c54590bb",
        },
    ],
    name: "Harry Styles",
};

export const album = {
    album_type: "album",
    album_group: "album",
    artists: [artist],
    id: "123asdasd",
    name: "Harry's House",
    images: [
        {
            url: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14",
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e02b46f74097655d7f353caab14",
        },
        {
            url: "https://i.scdn.co/image/ab67616d00004851b46f74097655d7f353caab14",
        },
    ],
    tracks: {
        items: [
            {
                artists: [{ artist }],
                duration_ms: 218577,
                id: "zxczxc234",
                name: "As It Was",
                preview_url:
                    "https://p.scdn.co/mp3-preview/c871f7a3b36ad708640a833fbf7a0b9e84c5b688?cid=e26e4e3168be4fc3b9a9c766601fa05a",
                track_number: 1
            }
        ]
    }
};

export const track = {
    album: album,
    artists: [artist],
    duration_ms: 218577,
    id: "zxczxc234",
    name: "As It Was",
    preview_url:
        "https://p.scdn.co/mp3-preview/c871f7a3b36ad708640a833fbf7a0b9e84c5b688?cid=e26e4e3168be4fc3b9a9c766601fa05a",
    track_number: 1
};

const single = {
    album_group: "single",
    album_type: "single",
    artists: [{ artist }],
    duration_ms: 209384,
    id: "aaaaa111",
    images: [
        {
            url: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14"
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e02b46f74097655d7f353caab14"
        },
        {
            url: "https://i.scdn.co/image/ab67616d00004851b46f74097655d7f353caab14"
        }
    ],
    name: "Matilda"
}

export const albums = [album, single]
export const tracks = [track];
export const artists = [artist];




