import React from "react";
import { Outlet } from "react-router-dom";
import { FunctionComponent, useState, ReactNode } from "react";
import Box from '@mui/material/Box';

interface LayoutProps {
    children?: ReactNode
}
export const LayoutContext = React.createContext({ playSongHandler: (url: string | undefined) => { } })


export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const [songPlaying, setSongPlaying] = useState<string | undefined>();
    const playSongHandler = (song: string | undefined) => {
        setSongPlaying(song)
    }

    const renderAudioPlayer = () => {
        if (songPlaying === undefined) {
            return (
                <>
                </>
            )
        }
        else {
            return (
                <Box display="flex" justifyContent="center" mt={10}>
                    <audio controls autoPlay src={songPlaying}></audio>
                </Box>
            )
        }
    }
    return (
        <div>
            <LayoutContext.Provider value={{ playSongHandler }}>
                <Outlet />
            </LayoutContext.Provider>
            {renderAudioPlayer()}
        </div>

    )
}