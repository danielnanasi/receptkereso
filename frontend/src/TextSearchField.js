import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Checkbox1 from './Checkbox'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: 55,
      marginTop: 20,
      marginBottom: 20,
      width: '25ch',
    },
  },
}));

export default function SearchFields() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    dish: '',
    allergene:'',
    searchInput: '',
    response: null,
  });
  console.log(state.dish)
  console.log(state.allergene)
  console.log(state.searchInput)

  const handleChange = (event) => { 
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
      
    });
  };

  
    
  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <TextField id="searchField" label="Search"  onChange={handleChange} value={TextField.Text} inputProps={{
            name: 'searchInput',
          }}/>
      
      <FormControl className={classes.formControl} >
        <InputLabel htmlFor="dish">Ételek</InputLabel>
        <Select
          native
          value={state.dish}
          onChange={handleChange}
          inputProps={{
            name: 'dish',
            id: 'dish',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"soup"}>Leves</option>
          <option value={"main"}>Főétel</option>
          <option value={"dessert"}>Desszert</option>
        </Select>
        </FormControl>

        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="allergene">Allergének</InputLabel>
        <Select
          native
          value={state.allergene}
          onChange={handleChange}
          inputProps={{
            name: 'allergene',
            id: 'allergene',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"vega"}>Vegetáriánus</option>
          <option value={"gluten"}>Gluténmentes</option>
          <option value={"sugar"}>Cukormentes</option>
        </Select>
      </FormControl>

      <Checkbox1/>
     

      <Button style={{width: 40, marginTop:35}} color="primary" onClick={() => { 
          console.log(state.searchInput)
          fetch("http://localhost:5000/search/" + state.searchInput)
            .then((response) => {return response.json()})
            .then((json) => {
            setState({response: json})
          });
          console.log(state.response)
       }}>Search</Button>
      
    </form>
  );
}