import { useState, useEffect, Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import BookingCard from "../../../Cards/BookingCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";
import Box from "@mui/material/Box";

function BookAppointmentStaff(props) {
  const [bookingList, setBookingList] = useState([]);
  const [ptemail, setPtemail] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [noteMsg, setNoteMsg] = useState("");

  useEffect(() => {
    async function fetchDocList() {
      setOpenBackdrop(true);
      const res = await api.docList();
      setOpenBackdrop(false);
      setBookingList(res.data);
      setNoteMsg(
        "**The data shown above are not real and are indicated for demo purpose only.**"
      );
    }
    fetchDocList();
  }, []);

  const [value, setValue] = useState(new Date());
  const [filteredList, setFilteredList] = useState(
    bookingList.length > 0 &&
      bookingList.filter((item) => item.wIds.includes(value.getDay()))
  );

  useEffect(() => {
    setFilteredList(
      bookingList.length > 0 &&
        bookingList.filter((item) => item.wIds.includes(value.getDay()))
    );
  }, [bookingList, value]);

  const handleChange = (val) => {
    setValue(val);
  };

  const handleEmailChange = (event) => {
    setPtemail(event.target.value);
  };

  return (
    <Fragment>
      <DashBar />
      <Container className="dash-container" maxWidth="lg">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Appointment Date"
            value={value}
            disablePast
            onChange={(newValue) => {
              handleChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                sx={{ marginTop: "3%", marginBottom: "5%" }}
                {...params}
                helperText={"mm/dd/yyyy"}
              />
            )}
          />
        </LocalizationProvider>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <TextField
            onChange={handleEmailChange}
            value={ptemail}
            fullWidth
            label="Patient's Email ID"
            id="fullWidth"
          />
        </Box>
        <br /> <br />
        <Grid container spacing={3}>
          {filteredList.length > 0 &&
            filteredList.map((doc, index) => {
              return (
                <Grid key={index} item xs={12} md={4} lg={4}>
                  <BookingCard
                    heading={doc.docName}
                    degree={doc.degree}
                    subheading={doc.wdays}
                    fee={doc.fee}
                    demail={doc.email}
                    linkto={props.linkto}
                    date={value}
                    ptemail={ptemail}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Typography variant="caption" gutterBottom component="div">
          {noteMsg}
        </Typography>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

export default BookAppointmentStaff;
