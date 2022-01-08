import { useState, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api";

export default function FeedbackCard(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [value, setValue] = useState(props.initialRating);
  const [feedbackText, setFeedbackText] = useState(props.initialReview);
  const [submit, setSubmit] = useState(props.feedbackAvailable);

  function handleChange(event) {
    setFeedbackText(event.target.value);
    setSubmit(false);
  }

  async function handleSubmit() {
    setOpenBackdrop(true);
    try {
      const res = await api.writeFeedback({
        pemail: props.pemail,
        demail: props.demail,
        doa: props.doa,
        rating: value,
        review: feedbackText,
      });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        setSubmit(true);
        alert(res.data.msg);
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  async function handleDelete() {
    setOpenBackdrop(true);
    try {
      const res = await api.deleteFeedback({
        pemail: props.pemail,
        demail: props.demail,
        doa: props.doa,
        rating: value,
        review: feedbackText,
      });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        setFeedbackText("");
        setValue(0);
        setSubmit(false);
        alert(res.data.msg);
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Rate Your Appointment with
          </Typography>
          <Typography variant="h5" component="div">
            {props.doc}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`on ${props.date}`}
          </Typography>
          <br />
          <TextField
            fullWidth
            label="your feedback..."
            value={feedbackText}
            id="fullWidth"
            autoComplete="off"
            onChange={handleChange}
          />
          <CardActions disableSpacing>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                setSubmit(false);
              }}
            />
            {submit ? (
              <Tooltip title="Delete your feedback">
                <Fab
                  onClick={handleDelete}
                  sx={{ color: "#f44336", marginLeft: "auto" }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!feedbackText && true}
                variant="contained"
                sx={{ marginLeft: "auto" }}
              >
                Submit
              </Button>
            )}
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
