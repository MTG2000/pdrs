import { createMuiTheme } from "@material-ui/core";

const primaryColor = "#007ebe";

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Titillium Web",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryColor
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#8bb6cb"
      // dark: will be calculated from palette.secondary.main,
    }
    // error: will use the default color
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: primaryColor,
        borderWidth: 1
      }
    },
    MuiInputLabel: {
      root: {
        // color: "red"
        color: primaryColor
      }
    }
  }
});
