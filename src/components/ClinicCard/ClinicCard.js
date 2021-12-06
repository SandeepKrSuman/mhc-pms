import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ClinicCard(props) {

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center"}} variant="outlined">
      <CardContent>
        <br />
        <Typography variant="h5" component="div">
            {props.heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.subheading}
        </Typography>
        <br />
      </CardContent>
    </Card>
  );
}
