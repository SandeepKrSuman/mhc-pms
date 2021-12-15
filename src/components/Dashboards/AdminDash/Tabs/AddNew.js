import { Fragment, forwardRef, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import "./AddNew.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddNew() {
  const [succOpen, setSuccOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccOpen(true);
    console.log("submited form!");
  }

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrOpen(false);
  };

  return (
    <Fragment>
      <DashBar user="AdminXyZ" />
      <Container
        sx={{ marginTop: "10vh" }}
        className="dash-container"
        maxWidth="lg"
      >
        <Typography variant="h5" gutterBottom component="div">
          Add to the Doctors' list:
        </Typography>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="fullname">Full Name</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Doctor's full name..."
                />
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="weekdays">Week Days</label>
              </div>
              <div className="col-75">
                <div className="checkbox-container">
                  <input type="checkbox" id="sun" name="sun" value="0" />
                  <label htmlFor="sun"> Sun </label>
                  <input type="checkbox" id="mon" name="mon" value="1" />
                  <label htmlFor="mon"> Mon </label>
                  <input type="checkbox" id="tue" name="tue" value="2" />
                  <label htmlFor="tue"> Tue </label>
                  <input type="checkbox" id="wed" name="wed" value="3" />
                  <label htmlFor="wed"> Wed </label>
                  <input type="checkbox" id="thu" name="thu" value="4" />
                  <label htmlFor="thu"> Thu </label>
                  <input type="checkbox" id="fri" name="fri" value="5" />
                  <label htmlFor="fri"> Fri </label>
                  <input type="checkbox" id="sat" name="sat" value="6" />
                  <label htmlFor="sat"> Sat </label>
                </div>
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="fee">Fee</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="text"
                  id="fee"
                  name="fee"
                  placeholder="Appointment fee..."
                />
              </div>
            </div>
            <br />
            <div className="rrow">
              <input className="input-submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </Container>
      <Snackbar
        key={"success"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={succOpen}
        autoHideDuration={3500}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully Added !
        </Alert>
      </Snackbar>
      <Snackbar
        key={"error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errOpen}
        autoHideDuration={3500}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Unable to add. An error occured!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default AddNew;
