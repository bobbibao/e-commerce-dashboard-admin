import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Container } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

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
    width: '100%',
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

  const [value, setValue] = useState(props.variant === "select" ? '' : props.value || '');
  const [categories, setCategories] = useState(props.options);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (event) => {
    if (props.variant === 'number' && event.target.value < 0) {
      return;
    }
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleAutoCompleteChange = (event, newValue) => {
    setValue(newValue);
    if (props.onChange) {
      props.onChange({ target: { value: newValue } });
    }
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Container className={classes.paper}>
      {props.variant === 'select' ? (
        <Autocomplete
          options={categories.map(category => category.value)}
          value={value}
          onChange={handleAutoCompleteChange}
          style={{ paddingTop: 16 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              variant="outlined"
              className={classes.textfield}
              InputLabelProps={{
                classes: {
                  root: classes.textfield,
                  focused: classes.textfield,
                }
              }}
              InputProps={{
                ...params.InputProps,
                classes: {
                  root: classes.textfield,
                  focused: classes.textfield,
                }
              }}
            />
          )}
        />
      ) : (
        <TextField
          id={`outlined-${props.label}`}
          label={props.label}
          type={props.variant === 'number' ? props.label === 'Giá bán' ? "text": 'number' : 'text'}
          className={classes.textfield}
          fullWidth
          multiline={props.variant === 'textarea'}
          rows={props.variant === 'textarea' ? 7 : 1}
          value={value}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.textfield,
              focused: classes.textfield,
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.textfield,
              focused: classes.textfield,
            }
          }}
        />
      )}
    </Container>
  );
}
