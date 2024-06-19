import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, TextField, Container, Typography, Divider, Box, IconButton, Button } from '@material-ui/core';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: '0 20px 60px -2px rgba(27,33,58,.4)',
    padding: 0,
    borderRadius: '8px',
    minWidth: 550
  },
  textfield: {
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
  formControl: {
    minWidth: 150,
    marginTop: theme.spacing(2),
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
  label: {
    marginTop: 8,
    color: 'white',
  },
  button: {
    boxShadow: 'none',
    marginLeft: '1rem'
  }
}));

export default function FieldModal(props) {
  const classes = useStyles();
  const selectRef = useRef(null);
  const inputLabel = useRef(null);

  const [value, setValue] = useState(props.variant === "select" ? '' : props.value || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [labelWidth, setLabelWidth] = useState(0);
  const [categories, setCategories] = useState(props.options);
  useEffect(() => {
    if (props.variant === "select") {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, [props.variant]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <Container className={classes.paper}>
      {props.variant !== 'select' ? (
        <TextField
          id={`outlined-${props.label}`}
          label={props.label}
          className={classes.textfield}
          fullWidth
          multiline={props.variant === 'textarea'}
          rows={props.variant === 'textarea' ? 4 : 1}
          value={value}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
      ) : (
        <FormControl variant="outlined" className={classes.formControl} margin="normal">
          <InputLabel ref={inputLabel} htmlFor="outlined-category-simple" id={`select-${props.label}-label`}>
            {props.label}
          </InputLabel>
          <Select
            labelId={`select-${props.label}-label`}
            id={`select-${props.label}`}
            value={value}
            onChange={handleChange}
            labelWidth={labelWidth}
            inputProps={{
              ref: selectRef,
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Container>
  );
}
