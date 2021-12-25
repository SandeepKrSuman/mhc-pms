import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, createSearchParams } from "react-router-dom";

const styleVerify = {
  backgroundColor: "#64dd17",
  color: "#000000",
  ":hover": {
    backgroundColor: "#64dd17",
    color: "#000000",
  },
};

const styleReject = {
  backgroundColor: "#FF1700",
  marginLeft: "auto",
  color: "#ffffff",
  ":hover": {
    backgroundColor: "#FF1700",
    color: "#ffffff",
  },
};

export default function VerifyCard(props) {
  let navigate = useNavigate();

  function handleVerify() {
    console.log("Verified!");
    if (props.unvuser === "doctor") {
      navigate({
        pathname: "/dashboard/admin/doctors'-list/add-new",
        search: `?${createSearchParams({
          name: props.heading,
          degree: props.degree,
        })}`,
      });
    }
  }

  function handleReject() {
    console.log("Rejected!");
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
          <Tooltip title="Verify User">
            <Fab onClick={handleVerify} style={styleVerify} aria-label="edit">
              <VerifiedIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Reject User">
            <Fab onClick={handleReject} style={styleReject} aria-label="edit">
              <CloseIcon />
            </Fab>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}
