import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

// const SpotifyWebApiMock: {
//     setAccessToken: () => {},
//     search: {
//         search: () => {
//             artists: {
//                 items: [
//                     {
//                         images: [
//                             { url: "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433" },
//                             { url: "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433" },
//                             { url: "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433" }
//                         ],
//                         name: "the beatles",
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     }
//                 ]
//             },
//             albums: {
//                 items: [
//                     {
//                         images: [
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" }
//                         ],
//                         name: "abbey road",
//                         artists: [
//                             {
//                                 name: "the beatles"
//                             }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     },
//                     {
//                         images: [
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" }
//                         ],
//                         name: "abbey road",
//                         artists: [
//                             {
//                                 name: "the beatles"
//                             }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     },
//                     {
//                         images: [
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" },
//                             { url: "https://i.scdn.co/image/ab67616d00001e0255612ece447bec5d62c68375" }
//                         ],
//                         name: "abbey road",
//                         artists: [
//                             {
//                                 name: "the beatles"
//                             }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     }
//                 ]
//             },
//             tracks: {
//                 items: [
//                     {
//                         album: {
//                             images: [
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                             ]
//                         },
//                         name: "maxwell silver hammer",
//                         artists: [
//                             { name: "the beatles" }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     },
//                     {
//                         album: {
//                             images: [
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                             ]
//                         },
//                         name: "abbey road",
//                         artists: [
//                             { name: "the beatles" }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     },
//                     {
//                         album: {
//                             images: [
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                                 { url: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25" },
//                             ]
//                         },
//                         name: "abbey road",
//                         artists: [
//                             { name: "the beatles" }
//                         ],
//                         id: "6dGnYIeXmHdcikdzNNDMm2"
//                     }
//                 ]
//             }

//         }
//     }
// }
const renderWithRouter = async (component: JSX.Element, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(component, { wrapper: BrowserRouter })
}

export default renderWithRouter;