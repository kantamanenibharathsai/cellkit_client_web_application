import React from "react";
import { Typography, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useStyles } from "./useStyle";

interface IProps {
  value: string;
  onChange: (value: SelectChangeEvent) => void;
  list: Array<string>;
  placeholder: string;
}

const CommonSelect: React.FC<IProps> = ({
  value,
  onChange,
  list,
  placeholder,
}) => {
  const classes = useStyles();
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event);
  };
  return (
    <>
      <Select
        className={classes.selectCom}
        value={value}
        displayEmpty
        renderValue={(value) => {
          if (!value) {
            return <Typography variant="body2">{placeholder}</Typography>;
          }
          return <Typography variant="body2">{value}</Typography>;
        }}
        onChange={handleChange}
        IconComponent={() => <ExpandMoreIcon className="expandMoreIcon" />}
      >
        {list.length > 0 &&
          list?.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default CommonSelect;
