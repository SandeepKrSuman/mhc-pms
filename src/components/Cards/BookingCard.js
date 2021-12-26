import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";

export default function BookingCard(props) {
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
          <Link
            className="link-btn"
            to={`/dashboard/${props.linkto}/make-payment`}
          >
            <Button
              variant="contained"
              color="warning"
              endIcon={<AddTaskIcon />}
            >
              BOOK
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
