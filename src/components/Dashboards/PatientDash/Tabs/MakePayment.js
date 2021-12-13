import Dashboard from "../../Dashboard";

const cardTitles = ["Card Payment", "UPI Payment"];

function MakePaymentPatinet() {
  return <Dashboard userName="PatientXyZ" cards={cardTitles} lgspace={6} />;
}

export default MakePaymentPatinet;
