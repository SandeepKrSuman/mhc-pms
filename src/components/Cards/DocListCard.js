import { useState, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api";

const styles = {
  backgroundColor: "#FF5403",
  color: "#ffffff",
  ":hover": {
    backgroundColor: "#FF5403",
    color: "#ffffff",
  },
};

export default function DocListCard(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [hide, setHide] = useState(true);
  const [newFee, setNewFee] = useState("");

  const style = {
    display: "none",
  };

  function handleEdit() {
    setHide(!hide);
  }

  function handleChange(event) {
    const nf = event.target.value;
    setNewFee(nf);
  }

  async function handleDone() {
    setOpenBackdrop(true);
    try {
      const res = await api.updateFee({ docName: props.heading, fee: newFee });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        setNewFee("");
        window.location.reload();
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
            <Fab onClick={handleEdit} style={styles} aria-label="edit">
              <EditIcon />
            </Fab>
          </CardActions>
          <Stack spacing={0} direction="row" sx={hide && style}>
            <TextField
              id="outlined-basic"
              label="Update Fee"
              type="number"
              value={newFee}
              onChange={handleChange}
              variant="outlined"
            />
            <Button onClick={handleDone} variant="outlined">
              Done
            </Button>
          </Stack>
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
