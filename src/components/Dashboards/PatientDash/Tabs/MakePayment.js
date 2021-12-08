import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function MakePayment(){
    return (
        <Container maxWidth="lg" sx={{height: "100vh", textAlign: "center", paddingTop: "20vh", paddingBottom: "3%", }}>
            <img alt="qr-code" src="/images/paymentQR.png" />
            <br /> <br />
            <Typography variant="body1" gutterBottom component="div">
                Scan the above QR to pay appointment fee of ₹ 1000
            </Typography>
            <br /> <br />
            <Fab href="/downloadFiles/invoice1000.pdf" download="mhc-pms-payment-invoice" color="primary" variant="extended">
                <FileDownloadIcon /> {" Invoice"}
            </Fab>
        </Container>
    );
}

export default MakePayment;