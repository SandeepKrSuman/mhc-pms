import Dashboard from "../Dashboard";

const cardTitles = [`Doctors' List`, "Generate Stats", "Verify Signup"];

function AdminDash(props) {
  return <Dashboard userName="AdminXyZ" cards={cardTitles} lgspace={6} />;
}

export default AdminDash;
