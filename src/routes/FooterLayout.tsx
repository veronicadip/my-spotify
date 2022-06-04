import React from "react";
import { Outlet } from "react-router-dom";

function FooterLayout() {
    return (
        <div>
            <Outlet />
            <audio controls src="https://p.scdn.co/mp3-preview/c871f7a3b36ad708640a833fbf7a0b9e84c5b688?cid=e26e4e3168be4fc3b9a9c766601fa05a"></audio>
        </div>
    )
}

export default FooterLayout;