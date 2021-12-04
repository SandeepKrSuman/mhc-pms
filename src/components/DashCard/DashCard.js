import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DashCard(props) {

  const handleClick = () => { console.log("clicked! "); };

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center", cursor: "pointer" }} variant="outlined" onClick={handleClick}>
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
