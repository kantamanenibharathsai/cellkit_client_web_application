import React from "react";
import { Button, SxProps } from "@mui/material";

import { useStyles,style } from "./useStyle";

interface IProps {
  title: string;
  styles?: SxProps;
  className?: string;
  onClick ?: any
}

const CommonButton: React.FC<IProps> = ({ title, className, styles = {width:'138px'},onClick }) => {

  const classes = useStyles();

  return (
    <>
      <Button
        sx={{ ...style.button, ...styles }}
        className={`${classes.labelCon} ${className}`}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  );
};

export default CommonButton;
