import React from "react";
import {
  Box,
  Pagination,
  SxProps,
  PaginationItem,
  Button,
  Typography,
} from "@mui/material";

import { useStyles, style } from "./useStyle";
interface IProps {
  handlePagination: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
  styles?: SxProps;
  className?: string;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
}

const CommonPagination: React.FC<IProps> = ({
  handlePagination,
  totalPages,
  className,
  styles = {},
  currentPage,
  pageSize,
  totalItems,
}) => {
  const classes = useStyles();
  const shownumOfProducts = () => {
    if (currentPage === totalPages) {
      return Number(totalItems) - Number(pageSize) * (Number(currentPage) - 1);
    } else {
      return pageSize;
    }
  };

  return (
    <Box
      sx={{ ...style.button, ...styles }}
      className={`${classes.labelCon} ${className}`}
    >
      <Typography>
        Showing {shownumOfProducts()} of {totalItems} products
      </Typography>
      <Pagination
        sx={style.paginationCon}
        count={totalPages}
        onChange={handlePagination}
        page={Number(currentPage!)}
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: (props) => (
                <Button {...props} sx={style.handleButtonStyles}>
                  Prev
                </Button>
              ),
              next: (props) => (
                <Button {...props} sx={style.handleButtonStyles}>
                  Next
                </Button>
              ),
            }}
            {...item}
          >
            {item.type === "previous"
              ? "Prev"
              : item.type === "next"
              ? "Next"
              : item.page}
          </PaginationItem>
        )}
      />
    </Box>
  );
};

export default CommonPagination;
