import Dashboard from "../../Dashboard";

const cardTitles = ["Card Payment", "UPI Payment", "Cash Payment"];

function MakePaymentStaff() {
  return <Dashboard userName="PatientXyZ" cards={cardTitles} lgspace={4} />;
}

export default MakePaymentStaff;
