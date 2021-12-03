import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { red } from '@mui/material/colors';


export default function DashBar(props) {

  function handleLogOut(){
    console.log('logout');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.user}
          </Typography>
          <Tooltip title="Log Out">
              <IconButton onClick={handleLogOut}  sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: red[500] }}>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
