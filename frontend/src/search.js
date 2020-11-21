import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'


const useStyles = makeStyles({
  table: {
    
    minWidth: 600,
    marginLeft: 50,
  },
  
});
const useStyles2 = makeStyles((theme) => ({
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

const StyledTableCell = withStyles((theme) => ({
    head: {
      
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [state, setState] = React.useState({
    dish: '0',
    allergene:'0',
    searchInput: '',
    response: null,
    search_value: TextField.Text,
    checkedB: false,
    
  });

  const handleChange = (event) => { 
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
      
    });
  };
  
  const submitHandler = (event) => { 
    event.preventDefault();
  
    const options=state.dish + state.allergene
      if (state.checkedB!=true){
      fetch("http://localhost:5000/search/" + state.searchInput + '/' + options)
        .then((response) => {return response.json()})
        .then((json) => {
        setState({
          ...state,
          response: json,
          dish: "0",
          allergene: "0",
          
        })            
      });
      
      
  }};
  let rows=[]
  let rows2=[]
  if (state.response !=null ){
    if (state.response["results"]!= null ){
      if (state.response["results"][0]!= undefined ){
        for (var i=0; i < state.response["results"].length; i++){
          rows2[i]= createData(state.response["results"][i].title,0,0,0,0);
  }}}}

  const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
     
    <TableContainer component={Paper}>
        <div style={{ marginTop:30}}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
              Receptkereső
            </Typography>
        </div>  
        <div> 
        <form className={classes2.root} noValidate autoComplete="off" onSubmit={submitHandler} >
      
      <TextField id="searchField" label="Search"  onChange={handleChange} value={state.search_value} inputProps={{
            name: 'searchInput',
          }}/>
      
      <FormControl className={classes2.formControl} >
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
          <option aria-label="None" value={"0"} />
          <option value={"1"}>Leves</option>
          <option value={"2"}>Főétel</option>
          <option value={"3"}>Desszert</option>
        </Select>
        </FormControl>

        <FormControl className={classes2.formControl} >
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
          <option aria-label="None" value={"0"} />
          <option value={"1"}>Vegetáriánus</option>
          <option value={"2"}>Gluténmentes</option>
          <option value={"3"}>Cukormentes</option>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChangeCheckbox}
            name="checkedB"
            color="primary"
            
          />
        }
        label="Keresés hozzávalók alapján" 
      />
          

      <Button type= "submit" style={{width: 40, marginTop:35}} color="primary" >Search</Button>
      
    </form>
    </div> 
  
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    </TableContainer>
  );
}

