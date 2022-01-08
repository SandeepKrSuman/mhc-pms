import { useState, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, createSearchParams } from "react-router-dom";
import api from "../../api";

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
  const [openBackdrop, setOpenBackdrop] = useState(false);
  let navigate = useNavigate();

  async function handleVerify() {
    setOpenBackdrop(true);
    try {
      const res = await api.verify({ email: props.subheading });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        if (props.unvuser === "doctor") {
          navigate({
            pathname: "/dashboard/admin/doctors'-list/add-new",
            search: `?${createSearchParams({
              name: props.heading,
              degree: props.degree,
              demail: props.subheading,
            })}`,
          });
        } else {
          if (!alert(res.data.msg)) {
            window.location.reload();
          }
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  async function handleReject() {
    setOpenBackdrop(true);
    try {
      const res = await api.reject({ data: { email: props.subheading } });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        if (!alert(res.data.msg)) {
          window.location.reload();
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
        <CardContent>
          <br />
          <Typography variant="h5" component="div">
            {props.heading}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.subheading}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Seeking role as: ${props.unvuser}`}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
