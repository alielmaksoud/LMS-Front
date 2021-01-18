import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function BarsDate(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Select Date"
        type="date"
        defaultValue="2021-01-14"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => event.target.value ? props.setDate(event.target.value ) : null}
      />
    </form>
  );
}

