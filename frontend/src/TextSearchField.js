import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: 55,
      marginTop: 20,
      width: '25ch',
    },
  },
}));

export default function SearchFields() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    
    dish: '',
  });

  const handleChange = (event) => {
    const dish = event.target.name;
    setState({
      ...state,
      [dish]: event.target.value,
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <TextField id="standard-basic" label="Search" />
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Ételek</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'dish',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"soup"}>Leves</option>
          <option value={"main"}>Főétel</option>
          <option value={"dessert"}>Desszert</option>
        </Select>
      </FormControl>
     

      <Button style={{width: 40, marginTop:35}} color="primary">Search</Button>
      
    </form>
  );
}