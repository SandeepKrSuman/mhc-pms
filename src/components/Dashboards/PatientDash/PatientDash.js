import Dashboard from "../Dashboard";

const cardTitles = [
  "View Location",
  "My Appointments",
  "Book Appointment",
  "Make Payment",
  "Prescriptions",
  "Feedback",
];

function PatientDash() {
  return (
    <Dashboard
      userName="PatientXyZ"
      cards={cardTitles}
      lgspace={4}
      userType="patient"
    />
  );
}

export default PatientDash;
