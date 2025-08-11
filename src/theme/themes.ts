import { PaletteMode, ThemeOptions } from '@mui/material';


export const colorPalette = {
  primary: "#6631f7",
  primaryLight: "#af93fb",
  secondary: "#7e52f8",
  tertiary: "#a383fa",
  alto: "#D2D2D2",
  mine_shaftapprox: "#2E2E2E",
};



export const getDesignTokens = (
  mode: PaletteMode,
  primaryOne: string | null,
  secondaryOne: string | null
): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: primaryOne ?? "#6631f7",
      light: primaryOne ? primaryOne + '33' : '#af93fb',
      dark: primaryOne ? primaryOne + '66' : '#6631f7',
    },
    secondary: {
      main: secondaryOne ?? "#7e52f8",
      light: secondaryOne ? secondaryOne + '33' : '#af93fb',
      dark: secondaryOne ? secondaryOne + '66' : '#6631f7',
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  }
  /*components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 400,
          textTransform: 'capitalize'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBackgroundClip: 'text'
          }
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          marginBottom: 15
        }
      }
    }
  },
  typography: {
    h1: {
      fontSize: '28px',
      fontWeight: 500,
      marginBottom: '5px'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '16px',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '14px',
      fontWeight: 500
    },
    h6: {
      fontSize: '12px',
      fontWeight: 500
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 'normal'
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 'normal'
    },
    body1: {
      fontSize: '16px',
      fontWeight: 'normal'
    },
    body2: {
      fontSize: '14px',
      fontWeight: 'normal'
    }
  }*/
});