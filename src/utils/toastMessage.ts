import { enqueueSnackbar, VariantType, SnackbarOrigin } from "notistack";

const anchorOrigin: SnackbarOrigin = { horizontal: "right", vertical: "top" };

const defaultErrorMsg = "Something went wrong!";

export const parseResponseError = (
  response: any,
  variant: VariantType = "error"
) => {
  const message = response?.message || defaultErrorMsg;
  enqueueSnackbar(message, { variant, anchorOrigin });
};

export const parseError = (error: unknown, variant: VariantType = "error") => {
  const message = (error as { message?: "string" })?.message;
  enqueueSnackbar(message || defaultErrorMsg, { variant, anchorOrigin });
};

export const displayAlert = (
  message: string,
  variant: VariantType = "success"
) => {
  enqueueSnackbar(message, { variant, anchorOrigin });
};
export const displayAlertRed = (
  message: string,
  variant: VariantType = "warning"
) => {
  enqueueSnackbar(message, { variant, anchorOrigin });
};