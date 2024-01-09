import { useState, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import API from "../../api";
import { message } from "antd";

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
  const [errFileName, setErrFileName] = useState(null);
  const [file, setFile] = useState(null);

  function handleChange(e) {
    const fname = e.target.files[0].name;
    const size = parseInt(e.target.files[0].size);
    if (size < 1000000) {
      setFileName(fname);
    } else {
      const errFname = "Allowed file size: < 1MB";
      setErrFileName(errFname);
    }

    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setOpenBackdrop(true);
    const formData = new FormData();
    formData.append("pemail", props.pemail);
    formData.append("demail", props.demail);
    formData.append("doa", props.doa);
    formData.append("prescriptionFile", file);
    try {
      const res = await API.uploadPrescription(formData);
      if (res.data.error) {
        setOpenBackdrop(false);
        message.error(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        setFileName(null);
        setErrFileName(null);
        if (!message.error(res.data.msg)) {
          window.location.reload();
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
      message.error(error.response.data.errorMsg);
      console.log(error);
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <label htmlFor={`file-uploader-${props.useKey}`}>
            <Input
              onChange={handleChange}
              accept="image/*, application/pdf"
              name="prescriptionFile"
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
            color={fileName ? "green" : "red"}
            display="block"
            gutterBottom
          >
            {fileName ? fileName : errFileName}
          </Typography>
          <br />
        </FormGroup>
        <Button
          disabled={fileName ? false : true}
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "100%" }}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
