import SearchAppBar from "../components/TopOfPage";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';


function NotFound() {
    return (
        <Box>
            <SearchAppBar />
            <h1>Error 404, page not found.</h1>
            <Link to="/">Go Home</Link>
        </Box>
    )
}


export default NotFound;
