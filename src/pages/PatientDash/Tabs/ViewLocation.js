import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function ViewLocation()
{
    const customStyle = {
        height: "100vh",
        paddingTop: "3%",
        paddingBottom: "3%"
    };

    return (
        <Container maxWidth="lg" style={customStyle}>
            <Typography variant="caption" gutterBottom component="div">
                **The location is for demo purpose only.**
            </Typography>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.6528516506432!2d88.43233301491192!3d22.629435085153496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fe3b109c623%3A0xdfbe090bb9572f78!2sB.%20P.%20Poddar%20Institute%20of%20Management%20and%20Technology!5e0!3m2!1sen!2sin!4v1638813401959!5m2!1sen!2sin" title="Clinic Location" width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe>
        </Container>
    );
}

export default ViewLocation;