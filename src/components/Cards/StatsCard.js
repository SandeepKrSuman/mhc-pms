import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function AppointmentCard(props) {
  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.subheading}
        </Typography>
        <Typography variant="h6" color="warning.main" component="div">
          <StarRateIcon />
        </Typography>
        <br />
      </CardContent>
    </Card>
  );
}
