import Dashboard from "../Dashboard";

const cardTitles = [`Doctors' List`, "Generate Stats"];

function AdminDash(props) {
  return <Dashboard userName="AdminXyZ" cards={cardTitles} lgspace={6} />;
}

export default AdminDash;
