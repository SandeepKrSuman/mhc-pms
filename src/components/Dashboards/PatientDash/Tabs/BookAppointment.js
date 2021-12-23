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

const bookingList = [
  {
    heading: "Dr. S. Bakshi",
    subheading: "Mon | Tue | Wed",
    degree: "MBBS",
    id: [1, 2, 3],
    fee: 1000,
  },
  {
    heading: "Dr. S. Dey",
    subheading: "Tue | Wed | Fri",
    degree: "MBBS",
    id: [2, 3, 5],
    fee: 1000,
  },
  {
    heading: "Dr. B. Santra",
    subheading: "Mon | Tue | Fri | Sat",
    degree: "MBBS",
    id: [1, 2, 5, 6],
    fee: 1500,
  },
  {
    heading: "Dr. A.K. Aryan",
    subheading: "Mon | Tue | Wed",
    degree: "MBBS",
    id: [1, 2, 3],
    fee: 1000,
  },
  {
    heading: "Dr. Kanti Ghosh",
    subheading: "Fri | Sat | Sun",
    degree: "MBBS",
    id: [5, 6, 0],
    fee: 1000,
  },
  {
    heading: "Dr. Satya N.",
    subheading: "Tue | Sat | Sun",
    degree: "MBBS",
    id: [2, 6, 0],
    fee: 1000,
  },
  {
    heading: "Dr. B.K. Bandhu",
    subheading: "Thu | Fri | Sun",
    degree: "MBBS",
    id: [4, 5, 0],
    fee: 1000,
  },
  {
    heading: "Dr. Kali Biswas",
    subheading: "Mon | Tue | Sat | Sun",
    degree: "MBBS",
    id: [1, 2, 6, 0],
    fee: 1500,
  },
  {
    heading: "Dr. Raman Raghav",
    subheading: "Mon | Wed | Thu | Sat",
    degree: "MBBS",
    id: [1, 3, 4, 6],
    fee: 1500,
  },
  {
    heading: "Dr. Deb Kumar",
    subheading: "Sat | Sun",
    degree: "MBBS",
    id: [6, 0],
    fee: 800,
  },
  {
    heading: "Dr. S.M. Malik",
    subheading: "Mon | Thu | Sun",
    degree: "MBBS",
    id: [1, 4, 0],
    fee: 1500,
  },
  {
    heading: "Dr. A.G. Gupta",
    subheading: "Wed | Thu | Fri",
    degree: "MBBS",
    id: [3, 4, 5],
    fee: 1000,
  },
  {
    heading: "Dr. S. Goswami",
    subheading: "Wed | Thu | Fri",
    degree: "MBBS",
    id: [3, 4, 5],
    fee: 800,
  },
  {
    heading: "Dr. R. Rey",
    subheading: "Thu",
    degree: "MBBS",
    id: [4],
    fee: 800,
  },
];

function BookAppointment() {
  const [value, setValue] = useState(new Date());
  const [filteredList, setFilteredList] = useState(
    bookingList.filter((item) => item.id.includes(value.getDay()))
  );

  useEffect(() => {
    setFilteredList(
      bookingList.filter((item) => item.id.includes(value.getDay()))
    );
  }, [value]);

  const handleChange = (val) => {
    setValue(val);
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
        <Grid container spacing={3}>
          {filteredList.map((doc, index) => {
            return (
              <Grid key={index} item xs={12} md={4} lg={4}>
                <BookingCard
                  heading={doc.heading}
                  degree={doc.degree}
                  subheading={doc.subheading}
                  fee={doc.fee}
                />
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="caption" gutterBottom component="div">
          **The data shown above are not real and are indicated for demo purpose
          only.**
        </Typography>
      </Container>
    </Fragment>
  );
}

export default BookAppointment;
