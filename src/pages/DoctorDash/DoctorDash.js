import Dashboard from "../../components/Dashboards/Dashboard";

const cardTitles = ["Appointments", "Upload Prescription"];

function DoctorDash() {
  return <Dashboard cards={cardTitles} lgspace={6} />;
}

export default DoctorDash;
