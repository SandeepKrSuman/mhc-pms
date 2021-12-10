import Dashboard from "../Dashboard";

const cardTitles = ["Book Appointment", "Cancel Appointment", "Make Payment"];

function StaffDash(props) {
  return <Dashboard userName="StaffXyZ" cards={cardTitles} lgspace={4} />;
}

export default StaffDash;
