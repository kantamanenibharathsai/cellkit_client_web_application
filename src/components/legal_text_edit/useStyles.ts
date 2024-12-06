import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  mainContainer: {
    padding: '2rem',
  },
  paperContainer: {
    marginTop: '12px',
    width: '100%',
    borderRadius: '15px !important',
    padding: '2rem',
  },

  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  toolbar: {

  },
  editContainer: {
    minHeight: '350px',
  },
  select:{ 
    width:'130px',
    borderRadius:'15px !important',
     height: '40px !important',
     marginRight:'12px',
    },

}));

export const style = {
  button: {
    height: '40px',
    width: '138px !important',
    borderRadius: '15px',
    fontSize: '16px',
    marginTop: '12px',
    marginBottom: '12px',
    marginRight: '12px',
  },
  saveButton: {
    height: '40px',
    borderRadius: '15px',
    width: '138px !important',
    marginTop: '12px',
    marginBottom: '12px',
    marginRight: '25px',
    fontSize: '16px'
  }
} satisfies Record<string, SxProps>
