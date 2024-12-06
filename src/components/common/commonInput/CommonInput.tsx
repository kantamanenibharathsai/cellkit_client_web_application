import React from "react";
import { Typography, Box, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextFieldInputType } from "../../../utils/utils";

import { useStyles } from "./useStyle";
import { colors } from "../../../config/theme";

interface IProps {
  value: string;
  type?: TextFieldInputType;
  onChange: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
  helperText?: React.ReactElement | string;
  placeholder: string;
  required?: boolean;
  select?: boolean;
  size?: "medium" | "small";
  variant?: "filled" | "outlined" | "standard";
  label: string;
  maxCharacters?: number;
  fullWidth?: boolean;
  multiline?:boolean;
  maxWidth?:string;
}

const CommonInput: React.FC<IProps> = ({
  label,
  maxCharacters,
  select,
  multiline,
  required = false,
  maxWidth = "428px",
  ...data
}) => {
  const finalData = Object.assign(
    {},
    {
      size: "medium",
      variant: "outlined",
      name: "",
      type: "text",
      helperText: "",
      fullWidth: true
    },
    data
  );
  const classes = useStyles();

  return (
    <>
      <Box className={classes.labelCon}>
        <Typography className={classes.label}>
          {label}
          {required && <Typography component={"span"}>{" *"}</Typography>}
        </Typography>
        {maxCharacters && (
          <Typography>{`${data.value.length}/${maxCharacters}`}</Typography>
        )}
      </Box>
      <TextField 
       multiline={multiline}
       sx={{border: 'none',maxWidth:`${maxWidth}`,"& fieldset": { border: 'none' }, input: { color: colors.primaryGrey }}}
       className={classes.textfield} {...finalData} inputProps={{ maxLength: maxCharacters }} />
    </>
  );
};

export default CommonInput;
