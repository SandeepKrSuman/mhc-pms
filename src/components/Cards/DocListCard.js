import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

const styles = {
  backgroundColor: "#FF5403",
  color: "#ffffff",
  ":hover": {
    backgroundColor: "#FF5403",
    color: "#ffffff",
  },
};

export default function DocListCard(props) {
  function handleEdit() {
    console.log("Edit!");
  }

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subheading}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="text.secondary">
          {`₹${props.fee}`}
        </Typography>
        <br />
        <CardActions disableSpacing>
          <Fab onClick={handleEdit} style={styles} aria-label="edit">
            <EditIcon />
          </Fab>
        </CardActions>
      </CardContent>
    </Card>
  );
}
