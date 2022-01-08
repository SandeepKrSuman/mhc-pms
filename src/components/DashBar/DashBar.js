import { useContext, useState, Fragment } from "react";
import { AuthContext } from "../../App";
import jwt from "jsonwebtoken";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function DashBar() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const user = token ? jwt.decode(token) : null;
  const userName = user ? user.name : null;

  async function handleLogOut() {
    setOpenBackdrop(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      await api.logout({ data: { refreshToken } });
      setOpenBackdrop(false);
      auth.setUserType(null);
      navigate("/");
    } catch (error) {
      setOpenBackdrop(false);
      console.error(error);
      alert(error.response.data.error);
    }
  }

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`Hi, ${userName ? userName : ""}`}
            </Typography>
            <Tooltip title="Log Out">
              <IconButton onClick={handleLogOut} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: red[500] }}>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
