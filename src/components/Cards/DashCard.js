import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import "./DashCard.css";
import { PaymentContext } from "../Dashboards/PatientDash/Tabs/MakePayment";
import { StaffPaymentContext } from "../Dashboards/StaffDash/Tabs/MakePayment";

export default function DashCard(props) {
  const payment = React.useContext(
    props.from === "staff" ? StaffPaymentContext : PaymentContext
  );
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const srch =
    payment &&
    `?${createSearchParams({
      pemail: payment.pemail,
      demail: payment.demail,
      doa: payment.doa,
    })}`;

  function handleClick(cardTitle) {
    let tab = cardTitle.toLowerCase();
    const tabName = tab.split(" ").join("-");
    if (pathname.charAt(pathname.length - 1) === "/") {
      if (payment && payment.pemail && payment.demail && payment.doa) {
        navigate({
          pathname: `${pathname}${tabName}`,
          search: srch,
        });
      } else {
        navigate(`${pathname}${tabName}`);
      }
    } else {
      if (payment && payment.pemail && payment.demail && payment.doa) {
        navigate({
          pathname: `${pathname}/${tabName}`,
          search: srch,
        });
      } else {
        navigate(`${pathname}/${tabName}`);
      }
    }
  }

  return (
    <Card
      className="card-bg"
      sx={{ maxWidth: "100%" }}
      variant="outlined"
      onClick={() => handleClick(props.cardTitle)}
    >
      <CardContent>
        <br /> <br />
        <Typography variant="h4" component="div">
          {props.cardTitle}
        </Typography>
        <br /> <br />
      </CardContent>
    </Card>
  );
}
