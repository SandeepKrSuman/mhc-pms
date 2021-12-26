import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FileUploader from "../FileUploader/FileUploader";

export default function UploadPrescriptionCard(props) {
  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Prescription to
        </Typography>
        <Typography variant="h5" component="div">
          {props.patient}
        </Typography>
        <br /> <br />
        <FileUploader useKey={props.useKey} />
      </CardContent>
    </Card>
  );
}
