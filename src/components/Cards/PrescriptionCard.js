import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function AppointmentCard(props) {
  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Prescription By
        </Typography>
        <Typography variant="h5" component="div">
          {props.doc}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          {`appointment on: ${props.date}`}
        </Typography>
        <br /> <br />
        <Fab
          href={`https://mhc-pms-server.herokuapp.com${props.file_url}`}
          download="my-prescription"
          color="primary"
          variant="extended"
        >
          <FileDownloadIcon /> {" Prescription"}
        </Fab>
      </CardContent>
    </Card>
  );
}
