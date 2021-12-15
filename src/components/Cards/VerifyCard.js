import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

const styles = {
  backgroundColor: "#64dd17",
  color: "#000000",
  ":hover": {
    backgroundColor: "#64dd17",
    color: "#000000",
  },
};

export default function VerifyCard(props) {
  let navigate = useNavigate();

  function handleVerify() {
    console.log("Verified!");
    if (props.unvuser === "doctor") {
      navigate(`/dashboard/admin/doctors'-list/add-new?name=${props.heading}`);
    }
  }

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subheading}
        </Typography>
        <br />
        <CardActions disableSpacing>
          <Fab onClick={handleVerify} style={styles} aria-label="edit">
            <VerifiedIcon />
          </Fab>
        </CardActions>
      </CardContent>
    </Card>
  );
}
