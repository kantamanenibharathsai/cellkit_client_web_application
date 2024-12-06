import React, { ChangeEvent, useState } from "react";
import { loginAction } from "../../redux/reducers/auth";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import { colors } from "../../config/theme";
import CommonButton from "../common/commonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { emailPattern, ToastError } from "../../utils/Validate";
import { Check } from "./assets/Svgs";
import { logoone } from "./assets";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {}

interface IState {
  user: {
    email: string;
    password: string;
  };
  errors: {
    emailError: string | undefined;
    passwordError: string | undefined;
  };
  showPassword: boolean;
}

const Login: React.FC<IProps> = () => {
  const [user, setUser] = useState<IState["user"]>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<IState["errors"]>({
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] =
    useState<IState["showPassword"]>(false);
  let isValidEmail = emailPattern.test(user.email);
  const dispatch = useAppDispatch();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.Auth
  );

  const navigate = useNavigate();
  const classes = useStyles();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const response = await dispatch(loginAction(user));
      const fullfiled = response.payload;
      if (fullfiled?.status) {
        setErrors({
          emailError: "",
          passwordError: "",
        })
        setTimeout(() => {
          navigate("/dashboard");
        }, 200);

        let date = new Date();
        date.setTime(date.getTime() + 10 * 60 * 60 * 1000);
        Cookies.set("token", fullfiled.token, { expires: date });
      } else {
        ToastError(response.payload);
        navigate("/");
      }
    }
  };

  const validateForm = () => {
    let tempErrors: {
      emailError: string | undefined;
      passwordError: string | undefined;
    } = { ...errors };

    if (!user.email) {
      tempErrors.emailError = "Email is required";
    } else if (!isValidEmail) {
      tempErrors.emailError = "Invalid email address";
    } else {
      delete tempErrors?.emailError;
    }
    if (!user.password) {
      tempErrors.passwordError = "Password is required";
    } else if (user.password.length < 4) {
      tempErrors.passwordError = "Password must be at least 8 characters";
    } else {
      delete tempErrors.passwordError;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box className={classes.mainContainer}>
      <Paper sx={style.containerPaper}>
        <Box component={"img"} src={logoone} className={classes.logoImage} />
        <Typography variant="h3" textAlign="center" mb={2}>
          {translate("login.loginHeading")}
        </Typography>
        <Typography textAlign="center" mb={4} className={classes.subHeading}>
          {translate("login.loginSubheading")}
        </Typography>
        <Box>
          <Typography className={classes.emailPasswrdLabel}>
            {translate("login.textEmailAddress")}:
          </Typography>
          <TextField
            name="email"
            value={user.email}
            onChange={handleOnChange}
            fullWidth
            sx={{
              marginTop: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            InputProps={{
              style: style.textFieldInputProp,
            }}
            helperText={
              <Typography
                height={16}
                fontSize={12}
                color={colors.error}
                ml={"-12px"}
              >
                {errors.emailError}
              </Typography>
            }
          />
        </Box>
        <Box mt={4}>
          <Box className={classes.labelForgotPasswordContainer}>
            <Typography className={classes.emailPasswrdLabel}>
              {translate("login.textPassword")}:
            </Typography>
            <Typography className={classes.forgotPwrd}>
              {translate("login.textForgetPassword")}
            </Typography>
          </Box>
          <TextField
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                style: style.textFieldInputProp,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{marginRight:"1px"}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            name="password"
            value={user.password}
            onChange={handleOnChange}
            fullWidth
            sx={{
              marginTop: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            helperText={
              <Typography
                height={16}
                fontSize={12}
                color={colors.error}
                ml={"-12px"}
              >
                {errors.passwordError}
              </Typography>
            }
          />
          <Box className={classes.rememberPassordContainer}>
            <Checkbox
              icon={<Box className={classes.checkedIcon} />}
              checkedIcon={<Check />}
              className={classes.rememberMeCheck}
            />
            <Typography className={classes.rememberMe}>
              {translate("login.textRememberPassword")}
            </Typography>
          </Box>
          <Box className={classes.signInBtnContainer}>
            <CommonButton
              title={translate("login.textSignIn")}
              styles={style.button}
              onClick={handleLogin}
            />
          </Box>
        </Box>
        <Typography textAlign={"center"} color={colors.black} height={"20px"}>
          {loading && translate("login.loading")}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
