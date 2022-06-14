Test Readme

// => means 'uses'

// Real world
App => Spotify client (import from spotify-web-api-ts) => API

// In tests, we don't want to hit the real API because:
//
// - it's slow
// - APIs generally have limits
// - In general tests are about encapsulating logic that you want to test

App => Spotify mock client

Mock client: an object, class or whatever that has _the same_ methods than the original, but instead of doing requests to the API, returns hardcoded data.

---

<Home spotifyClient={spotifyClient}>
class SpotifyClient {
    request() {
        return Promise(...)
    }
}

class SpotifyMockClient {
request() {
return Promise.resolve({...})
}
}
