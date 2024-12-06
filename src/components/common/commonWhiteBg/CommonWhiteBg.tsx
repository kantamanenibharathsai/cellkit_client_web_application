import React from "react";
import { Box, SxProps } from "@mui/material";

import { useStyles,style } from "./useStyle";

interface IProps extends React.PropsWithChildren {
  styles?: SxProps;
  className?: string;
}

const CommonWhiteBg: React.FC<IProps> = ({ children, className, styles = {} }) => {

  const classes = useStyles();

  return (
    <Box
        sx={{ ...style.button, ...styles }}
        className={`${classes.labelCon} ${className}`}
      >
        {children}
      </Box>
  );
};

export default CommonWhiteBg;
