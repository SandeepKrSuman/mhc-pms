import Dashboard from "../Dashboard";

const cardTitles = [`Doctors' List`, "Generate Stats", "Verify Signup"];

function AdminDash() {
  return <Dashboard cards={cardTitles} lgspace={6} />;
}

export default AdminDash;
