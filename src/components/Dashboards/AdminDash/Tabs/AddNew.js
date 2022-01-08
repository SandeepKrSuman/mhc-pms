import { Fragment, forwardRef, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";
import "./AddNew.css";
import api from "../../../../api";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddNew() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [searchParams] = useSearchParams();
  const nm = searchParams.get("name");
  const dg = searchParams.get("degree");
  const demail = searchParams.get("demail");
  const [succOpen, setSuccOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [fullName, setFullName] = useState(nm ? nm : "");
  const [email, setEmail] = useState(demail ? demail : "");
  const [weekDays, setWeekDays] = useState({
    Sun: { checked: false, value: null },
    Mon: { checked: false, value: null },
    Tue: { checked: false, value: null },
    Wed: { checked: false, value: null },
    Thu: { checked: false, value: null },
    Fri: { checked: false, value: null },
    Sat: { checked: false, value: null },
  });
  const [degree, setDegree] = useState(dg ? dg : "");
  const [fee, setFee] = useState("");
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const [successMessage, setSuccessMessage] = useState("Successful!");

  function handleName(event) {
    const n = event.target.value;
    setFullName(n);
  }
  function handleEmail(event) {
    const e = event.target.value;
    setEmail(e);
  }
  function handleDegree(event) {
    const d = event.target.value;
    setDegree(d);
  }
  function handleFee(event) {
    const f = event.target.value;
    setFee(f);
  }
  function handleCheckSun(event) {
    setWeekDays((prev) => ({
      Sun: { checked: !prev.Sun.checked, value: event.target.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckMon(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: !prev.Mon.checked, value: event.target.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckTue(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: !prev.Tue.checked, value: event.target.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckWed(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: !prev.Wed.checked, value: event.target.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckThu(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: !prev.Thu.checked, value: event.target.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckFri(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: !prev.Fri.checked, value: event.target.value },
      Sat: { checked: prev.Sat.checked, value: prev.Sat.value },
    }));
  }
  function handleCheckSat(event) {
    setWeekDays((prev) => ({
      Sun: { checked: prev.Sun.checked, value: prev.Sun.value },
      Mon: { checked: prev.Mon.checked, value: prev.Mon.value },
      Tue: { checked: prev.Tue.checked, value: prev.Tue.value },
      Wed: { checked: prev.Wed.checked, value: prev.Wed.value },
      Thu: { checked: prev.Thu.checked, value: prev.Thu.value },
      Fri: { checked: prev.Fri.checked, value: prev.Fri.value },
      Sat: { checked: !prev.Sat.checked, value: event.target.value },
    }));
  }

  async function handleSubmit(e) {
    setOpenBackdrop(true);
    e.preventDefault();
    const wds = Object.keys(weekDays);
    const trueWds = wds.filter((key) => {
      return weekDays[key].checked;
    });
    const wdstr = trueWds.join(" | ");
    let wIds = [];
    trueWds.forEach((key) => {
      wIds.push(parseInt(weekDays[key].value));
    });
    const postData = {
      docName: fullName,
      email: email,
      degree: degree,
      wdays: wdstr,
      fee: parseInt(fee),
      wIds: wIds,
    };

    try {
      const res = await api.addNew(postData);
      if (res.data.error) {
        setOpenBackdrop(false);
        setErrorMessage(res.data.erroMsg);
        setErrOpen(true);
      } else {
        setOpenBackdrop(false);
        setSuccessMessage(res.data.msg);
        setSuccOpen(true);
      }
    } catch (error) {
      setOpenBackdrop(false);
      setErrorMessage(error.response.data.errorMsg);
      setErrOpen(true);
      console.log(error);
    }
    setOpenBackdrop(false);
    setFullName("");
    setEmail("");
    setWeekDays({
      Sun: { checked: false, value: null },
      Mon: { checked: false, value: null },
      Tue: { checked: false, value: null },
      Wed: { checked: false, value: null },
      Thu: { checked: false, value: null },
      Fri: { checked: false, value: null },
      Sat: { checked: false, value: null },
    });
    setDegree("");
    setFee("");
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
      <DashBar />
      <Container
        sx={{ marginTop: "10vh" }}
        className="dash-container"
        maxWidth="lg"
      >
        <Typography variant="h5" gutterBottom component="div">
          Add to the Doctors' list:
        </Typography>
        <div className="container">
          <form validate="true" onSubmit={handleSubmit}>
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
                  value={fullName}
                  onChange={handleName}
                  placeholder="Doctor's full name including honorific..."
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="Registered Email Id..."
                  required
                />
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="weekdays">Week Days</label>
              </div>
              <div className="col-75">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="sun"
                    name="sun"
                    value={0}
                    onChange={handleCheckSun}
                    checked={weekDays.Sun.checked}
                  />
                  <label htmlFor="sun"> Sun </label>
                  <input
                    type="checkbox"
                    id="mon"
                    name="mon"
                    value={1}
                    onChange={handleCheckMon}
                    checked={weekDays.Mon.checked}
                  />
                  <label htmlFor="mon"> Mon </label>
                  <input
                    type="checkbox"
                    id="tue"
                    name="tue"
                    value={2}
                    onChange={handleCheckTue}
                    checked={weekDays.Tue.checked}
                  />
                  <label htmlFor="tue"> Tue </label>
                  <input
                    type="checkbox"
                    id="wed"
                    name="wed"
                    value={3}
                    onChange={handleCheckWed}
                    checked={weekDays.Wed.checked}
                  />
                  <label htmlFor="wed"> Wed </label>
                  <input
                    type="checkbox"
                    id="thu"
                    name="thu"
                    value={4}
                    onChange={handleCheckThu}
                    checked={weekDays.Thu.checked}
                  />
                  <label htmlFor="thu"> Thu </label>
                  <input
                    type="checkbox"
                    id="fri"
                    name="fri"
                    value={5}
                    onChange={handleCheckFri}
                    checked={weekDays.Fri.checked}
                  />
                  <label htmlFor="fri"> Fri </label>
                  <input
                    type="checkbox"
                    id="sat"
                    name="sat"
                    value={6}
                    onChange={handleCheckSat}
                    checked={weekDays.Sat.checked}
                  />
                  <label htmlFor="sat"> Sat </label>
                </div>
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="degree">Degree</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="text"
                  id="degree"
                  name="degree"
                  value={degree}
                  onChange={handleDegree}
                  placeholder="Doctor's degree"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="fee">Fee</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="number"
                  id="fee"
                  name="fee"
                  value={fee}
                  onChange={handleFee}
                  placeholder="Appointment fee..."
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <br />
            <div className="rrow">
              <input className="input-submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
        {nm && dg && demail && (
          <Typography variant="caption" gutterBottom component="div">
            * List will not be updated if you leave the page without submitting.
            *
          </Typography>
        )}
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
          {successMessage}
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
          {errorMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

export default AddNew;
