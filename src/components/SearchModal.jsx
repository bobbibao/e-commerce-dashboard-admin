import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '375px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5f6368',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      color: 'white !important',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(252, 213, 53)',
    }
  },
  typeField: {
    marginLeft: theme.spacing(1),
    width: '175px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5f6368',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      color: 'white !important',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(252, 213, 53)',
    },
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    boxShadow: 'none',
    backgroundColor: "rgb(252, 213, 53)", 
    color: "rgb(32, 38, 48)",
    '&:hover':{
      opacity: 0.8
    }
  },
  title: {
    fontFamily: 'ApercuMedium',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: 'rgb(234, 236, 239)'
  }
}));



export default function Search(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    type: 'ID',
  });

  const [queryValue, setQueryValue] = React.useState('');

  const attributes = [
    {
      value: 'ID',
      label: 'ID',
    },
    {
      value: 'Name',
      label: 'Name',
    },
    {
      value: 'Type',
      label: 'Type',
    },
  ];

  function handleChange(event) {
    setValues(oldValues => ({
      type: event.target.value,
    }));
  }

  function handleQueryValue(e) {
    setQueryValue(e.target.value);
  }


  return (
    <div>
      <Typography variant="h4" className={classes.title}>Search Inventory</Typography>
      <TextField
        id="outlined-name"
        label="Value"
        className={classes.textField}
        value={queryValue.value}
        onChange={handleQueryValue}
        margin="normal"
        variant="outlined"
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon edge="start" style={{ color: "#757575" }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="standard-select-attribute"
        select
        label="Attribute"
        className={classes.typeField}
        value={values.type}
        onChange={handleChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >
        {attributes.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Box style={{ marginTop: '2em', display: "flex", justifyContent: "flex-end" }}>
        <Button vsize="small" className={classes.button} style={{ marginRight: '1em', backgroundColor: "inherit", color: "rgb(240, 185, 11)"}}  onClick={props.onClose} >
          Cancel
        </Button>
        <Button variant="contained"  className={classes.button} onClick={
          props.handleSearch(queryValue)
        } >
          Search
        </Button>
      </Box>

    </div>
  );
}