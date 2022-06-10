import SearchAppBar from "../components/TopOfPage";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container"
import Typography from '@mui/material/Typography';


function NotFound() {
    return (
        <div>
            <SearchAppBar />
            <div>
                <Container maxWidth="xl">
                    <Typography variant="h2" align="center" mt={10} fontWeight="bold">Error 404, page not found.</Typography>
                    <Typography variant="h5" mt={5} align="center">
                        <Link to="/">Go Home</Link>
                    </Typography>
                </Container>
            </div>
        </div>
    )
}


export default NotFound;
