import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


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


function createData(id, title, image) {
  return { id, title, image };
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
    console.log(options)
    console.log()
        if (state.checkedB!=true){
            fetch("http://localhost:5000/search/" + state.searchInput + '/' + options)
                .then((response) => {return response.json()})
                .then((json) => {
                    console.log(json)
                    setState({
                    ...state,
                    response: json,
                    dish: "0",
                    allergene: "0",
            
                })            
            });
        }
        else {
            fetch("http://localhost:5000//search_ingredient/" + state.searchInput)
            .then((response) => {return response.json()})
            .then((json) => {
                console.log("fasz")
                console.log(json)
                setState({
                    ...state,
                    response: json,
            })
        });
            
        }



};

  let rows2=[]
  if (state.response !=null ){
    if (state.response["results"]!= null ){
      if (state.response["results"][0]!= undefined ){
        for (var i=0; i < state.response["results"].length; i++){
          rows2[i]= createData(state.response["results"][i],state.response["results"][i].title,state.response["results"][i].image);
  }}}}

  const handleChangeCheckbox = (event) => {
      console.log(state.checkedB)
    setState({ ...state, [event.target.name]: event.target.checked });
  };

return (
    <React.Fragment >
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Receptkereső
            </Typography>
          </Container>
        </div>

        <div align="center" style={{marginTop:100, marginBottom: 100}}> 
          <form className={classes2.root} noValidate autoComplete="off" onSubmit={submitHandler} >
        
            <TextField id="searchField" label="Search"  onChange={handleChange} value={state.search_value} inputProps={{
              name: 'searchInput',
          }}/>
        <FormControl className={classes2.formControl} >
        <InputLabel htmlFor="dish">Ételek</InputLabel>
        <Select
          native
          disabled={state.checkedB}
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
          disabled={state.checkedB}
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
        
    <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
        {rows2.map((card,i) => (
            <Grid item key={card.image} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardMedia>
                <img src={card.image} />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography align="center" variant="h5" component="h2">
                        {card.title}
                    </Typography>
                </CardContent>
                <CardActions  className={classes.cardActions}>
                    <Button style={{margin:"auto"}} size="small" color="primary" variant="outlined" href={card.link}>
                        View
                    </Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
    </Container>
    </main>
      
    </React.Fragment>
  );
}

