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

const album = {
  //....
};

const albums = [album];

function mockAlbum(overrides: Partial<Album>): Partial<Album> {
  return {
    name: "",
    ...overrides,
  };
}

const albums2 = [mockAlbum({ name: "name1" }), mockAlbum({ name: "name2" })];
