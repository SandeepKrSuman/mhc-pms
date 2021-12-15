import { useState } from "react";
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

export default function FeedbackCard(props) {
  const [value, setValue] = useState(3);
  const [feedbackText, setFeedbackText] = useState("");
  const [submit, setSubmit] = useState(false);

  function handleChange(event) {
    setFeedbackText(event.target.value);
  }

  function handleSubmit() {
    console.log({
      rating: value,
      feedback: feedbackText,
    });
    setSubmit(true);
  }

  function handleDelete() {
    setFeedbackText("");
    setValue(0);
    setSubmit(false);
  }

  return (
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
  );
}
