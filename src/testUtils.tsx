import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export const renderWithRouter = async (component: JSX.Element, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(component, { wrapper: BrowserRouter })
}

export const renderArtistHomeWithRouter = async (
    component: JSX.Element,
    { route = "/artist/:artistId" } = {}
) => {
    window.history.pushState({}, "Test page", route);
    return render(component, { wrapper: BrowserRouter });
}
