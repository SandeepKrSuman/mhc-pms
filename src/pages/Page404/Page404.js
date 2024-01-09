import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import './Page404.css';

function Page404() {
    return (
        <div className="main-container">
            <Typography className="typ404" variant="h4" component="div" gutterBottom>Sorry!</Typography>
            <Typography className="typ404" variant="h6" component="div" gutterBottom>We are unable to find the page</Typography>
            <Typography className="typ404" variant="h6" component="div" gutterBottom>you're looking for.</Typography>
            <br /> <br />
            <Link className="goback-btn-link" to="/">
                <Button variant="contained" color="error" endIcon={<HomeIcon />}>Go Back</Button>
            </Link>
        </div>
    );
}

export default Page404;