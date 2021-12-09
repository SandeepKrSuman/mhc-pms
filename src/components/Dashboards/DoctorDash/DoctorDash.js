import Dashboard from "../Dashboard";

const cardTitles = ["Appointments", "Upload Prescription"];

function DoctorDash(props) {
  return (
    <Dashboard
      userName="DoctorXyZ"
      cards={cardTitles}
      lgspace={6}
      userType="doctor"
    />
  );
}

export default DoctorDash;
