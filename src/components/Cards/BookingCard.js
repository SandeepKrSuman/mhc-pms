import { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, createSearchParams } from "react-router-dom";
import api from "../../api";
import jwt from "jsonwebtoken";

export default function BookingCard(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  async function handleClick() {
    setOpenBackdrop(true);
    if (props.linkto === "staff") {
      setOpenBackdrop(false);
      if (!validateEmail(props.ptemail)) {
        alert("Enter a valid email");
        return;
      }
    }
    const token = localStorage.getItem("accessToken");
    const payload = token && jwt.decode(token);
    const patient = payload && payload.name;
    const pemail =
      payload && payload.userType === "patient" ? payload.email : props.ptemail;
    const d = new Date(props.date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months[d.getMonth()];
    let dt = d.getDate();
    let year = d.getFullYear();
    const date = dt + " " + month + " " + year;
    const postData = {
      patient: patient,
      doctor: props.heading,
      pemail: pemail,
      demail: props.demail,
      date: date,
      doa: Date.parse(props.date),
    };
    try {
      const res = await api.bookAppointment(postData);
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        navigate({
          pathname: `/dashboard/${props.linkto}/make-payment`,
          search: `?${createSearchParams({
            pemail,
            demail: props.demail,
            doa: Date.parse(props.date),
          })}`,
        });
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
            {props.degree}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.subheading}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {`₹${props.fee}`}
          </Typography>
          <br />
          <CardActions disableSpacing>
            <Button
              variant="contained"
              color="warning"
              endIcon={<AddTaskIcon />}
              onClick={handleClick}
            >
              BOOK
            </Button>
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
