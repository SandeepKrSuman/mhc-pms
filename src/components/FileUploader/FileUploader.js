import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

const Input = styled("input")({
  display: "none",
});

const useStyle = {
  border: "4px dotted #A2D2FF",
  width: "100%",
  height: "100px",
  fontSize: "1.2rem",
};

export default function FileUploader() {
  const [fileName, setFileName] = useState(null);

  function handleChange(e) {
    const fname = e.target.files[0].name;
    setFileName(fname);
  }

  function handleSubmit() {
    console.log(`submitted file: ${fileName}`);
    setFileName(null);
  }

  return (
    <FormGroup>
      <label htmlFor="contained-button-file">
        <Input
          onChange={handleChange}
          accept="image/*, application/pdf"
          id="contained-button-file"
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
  );
}
