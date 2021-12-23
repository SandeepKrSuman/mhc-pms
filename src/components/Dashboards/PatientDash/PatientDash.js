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
  return <Dashboard cards={cardTitles} lgspace={4} />;
}

export default PatientDash;
