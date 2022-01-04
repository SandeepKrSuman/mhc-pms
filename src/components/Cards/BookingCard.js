import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useNavigate, createSearchParams } from "react-router-dom";
import api from "../../api";
import jwt from "jsonwebtoken";

export default function BookingCard(props) {
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  async function handleClick() {
    if (props.linkto === "staff") {
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
        alert(res.data.errorMsg);
      } else {
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
      alert(error.response.data.errorMsg);
      console.log(error);
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
          {props.degree}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subheading}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="text.secondary">
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
  );
}
