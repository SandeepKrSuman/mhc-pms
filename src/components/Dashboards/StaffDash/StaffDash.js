import Dashboard from "../Dashboard";

const cardTitles = ["Book Appointment", "Cancel Appointment", "Make Payment"];

function StaffDash() {
  return <Dashboard cards={cardTitles} lgspace={4} />;
}

export default StaffDash;
