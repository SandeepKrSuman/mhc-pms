import { useState, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api";

const Input = styled("input")({
  display: "none",
});

const useStyle = {
  border: "4px dotted #A2D2FF",
  width: "100%",
  height: "100px",
  fontSize: "1.2rem",
};

export default function FileUploader(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [fileName, setFileName] = useState(null);

  function handleChange(e) {
    const fname = e.target.files[0].name;
    setFileName(fname);
  }

  async function handleSubmit() {
    setOpenBackdrop(true);
    try {
      const res = await api.uploadPrescription({
        pemail: props.pemail,
        demail: props.demail,
        doa: props.doa,
      });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        alert(res.data.msg);
        setFileName(null);
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  return (
    <Fragment>
      <FormGroup>
        <label htmlFor={`file-uploader-${props.useKey}`}>
          <Input
            onChange={handleChange}
            accept="image/*, application/pdf"
            id={`file-uploader-${props.useKey}`}
            type="file"
          />
          <Button
            style={useStyle}
            variant="outlined"
            component="span"
            startIcon={<PublishIcon />}
          >
            Upload
          </Button>
        </label>
        <br />
        <Typography
          sx={{ textAlign: "center" }}
          variant="caption"
          color="green"
          display="block"
          gutterBottom
        >
          {fileName}
        </Typography>
        <br />
        <Button
          disabled={fileName ? false : true}
          onClick={handleSubmit}
          variant="contained"
        >
          Submit
        </Button>
      </FormGroup>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
