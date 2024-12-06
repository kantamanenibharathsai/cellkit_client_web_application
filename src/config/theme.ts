import { createTheme } from "@mui/material";

export const fonts = {
  primary: "Nunito Sans, sans-serif",
  secondry: "Arial",
};

const lightTheme = {
  red: "#FF0000",
  primary: "#BBF246",
  secondry: "#36CC55",
  title: "#192126",
  subTitle: "#19212680",
  description: "#8593A8",
  error: "#FF0000",
  background: "#E4F4FC",
  white: "#FFFFFF",
  black: "#000000",
  primaryYellow: "#FCB911",
  secondaryYellow: "#FEC53D",
  tertiaryYellow: "#FFC794",
  shadowYellowOne: "#FFD1A7",
  primaryGreen: "#14ACA4",
  secondayGreen: "#4AD991",
  primaryBlack: "#202224",
  secondaryBlack: "#404040",
  primaryGrey: "#B5B5B5",
  secondaryGrey: "#A8A8A8",
  tertiaryGrey: "#979797",
  quaternaryGrey : "#D5D5D5",
  primaryRed: "#FF9066",
  secondaryRed: "#FD5454",
  primaryViolate: "#8280FF",
  primaryDark: "#606060",
  secondaryDark: "#434343 ",
  tertiaryDark: "#6F757E",
  secondaryWhite: "#F1F4F9",
  tertiaryWhite: "#F5F6FA",
  shadowWhite: "#E0E0E0",
  shadowWhiteTwo: "#E1E1E1",
  shadowOrange: "#FF8E291A",
  borderLightGrey: '#DFEAF2',
  borderGrey: "#A3A3A3",
  whiteBackground: '#F9F9FB',
  pieBlack: "#0D2535",
  pieBlue: "#5388D8",
  pieYellow: "#F4BE37",
  pieOrenge: "#FF9F40",
  pieSafron: "#FF8042",
  neonGreen : "#49F7DE",
};

const darkTheme = {
  red: "#FF0000",
  primary: "#BBF246",
  secondry: "#36CC55",
  title: "#192126",
  subTitle: "#19212680",
  description: "#8593A8",
  error: "#FF0000",
  background: "#E4F4FC",
  white: "#FFFFFF",
  black: "#000000",
  primaryYellow: "#FCB911",
  secondaryYellow: "#FEC53D",
  tertiaryYellow: "#FFC794",
  shadowYellowOne: "#FFD1A7",
  primaryGreen: "#14ACA4",
  secondayGreen: "#4AD991",
  primaryBlack: "#202224",
  secondaryBlack: "#404040",
  primaryGrey: "#B5B5B5",
  secondaryGrey: "#A8A8A8",
  tertiaryGrey: "#979797",
  quaternaryGrey : "#D5D5D5",
  primaryRed: "#FF9066",
  secondaryRed: "#FD5454",
  primaryViolate: "#8280FF",
  primaryDark: "#606060",
  secondaryDark: "#434343 ",
  tertiaryDark: "#6F757E",
  secondaryWhite: "#F1F4F9",
  tertiaryWhite: "#F5F6FA",
  shadowWhite: "#E0E0E0",
  shadowWhiteTwo: "#E1E1E1",
  shadowOrange: "#FF8E291A",
  borderLightGrey: '#DFEAF2',
  borderGrey: "#A3A3A3",
  whiteBackground: '#F9F9FB',
  pieBlack: "#0D2535",
  pieBlue: "#5388D8",
  pieYellow: "#F4BE37",
  pieOrenge: "#FF9F40",
  pieSafron: "#FF8042",
  neonGreen : "#49F7DE",
};

const isDarkMode = false;

export const colors = isDarkMode ? darkTheme : lightTheme;

export const theme = createTheme({
  // You can change styling here for material-ui component to reflect it globally
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondry,
      contrastText: colors.white,
    },
  },
  typography: {
    fontFamily: [fonts.primary].join(","),
    h1: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: "38.19px",
      letterSpacing: "1px",
      color: colors.primaryBlack,
    },
    h2: {
      fontSize: "1.625rem",
      fontWeight: 700,
      lineHeight: "35.46px",
      letterSpacing: "-0.11px",
      color: colors.primaryBlack,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: "20px",
      color: colors.primaryBlack,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: "30px",
      color: colors.black,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: colors.primaryBlack,
      lineHeight: "19.1px"
    },
    body2: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: colors.primaryGrey,
      lineHeight: "16.37px"
    }
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: "46px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "46px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label:not(.Mui-focused):not(.MuiFormLabel-filled)": {
            top: "-4px",
          },
          inputProps: {
            style: {
              height: 40,
              padding: "0 14px",
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 425,
      sm: 769,
      md: 1025,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const hex2rgba = (hex: string, alpha = 1) => {
  const matchs = hex.match(/\w\w/g);
  if (!matchs) {
    return hex;
  }
  const [r, g, b] = matchs.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
