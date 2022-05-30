import React from "react";
import SearchAppBar from "../components/TopOfPage";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <SearchAppBar />
            <h1>Error 404, page not found.</h1>
            <Link to="/">Go Home</Link>
        </div>

    )
}


export default NotFound;
