import React ,{useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Image from  "next/image";
import { Typography ,MenuItem } from '@material-ui/core';
import _ from  "lodash";
const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sizeLogoBox : {
    minHeight : '100px',
    padding : '12px'
  },
  box : {
    border : '1px solid '+theme.palette.border,
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '23px'
  },
  radioGroup : {
    flexDirection : 'row'
  },
  label : {
    textAlign : 'left',
    borderBottom : '0px'
  },
  leftBottomBox : {
    display : 'flex',

  },
  infoBox : {
    borderRight : '3px solid '+theme.palette.primary.main,
    padding : '12px',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-around'
  },
  lastBox : {
    padding : '12px',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-around'
  }
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [systemSizeLIst, setSystemSizeList] = useState(["dummy1", "dummy2"]);

  const [systemSize, setSystemSize] = useState("");
  const [structure, setStructure] = useState("");
  const [solar, setSolar] = useState("");
  const [avgbill, setAvgbill] = useState(1);

  const [error, setError] = useState("");

  useEffect(() => {
    const getSystemSizeList = async () => {
      const res = await getCategories();
      setSystemSizeList(res);
    }

    // ---- Uncomment whem API is working ----
    // getSystemSizeList();

  }, []);


  useEffect(() => {
    const obj = {
      systemSize,
      structure,
      solar,
      avgbill
    }
    props.handler(obj);
  }, [systemSize, structure, solar, avgbill]);


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} md={7}>
            <Grid container spacing={3} direction="column">
              <Box className={classes.sizeLogoBox}>
                <Image src="/sasksolar.gif" height={300} width={400} />
              </Box>
              <Box className={classes.leftBottomBox} alignContent="center" justifyContent="space-around">
                 <Box className={classes.infoBox} > 
                     <Typography variant="h3" component="h3">350 SF</Typography>
                     <Typography  component="h4">Rooftop Area</Typography>
                  </Box>
                 <Box className={classes.infoBox}>
                    <Typography variant="h3" component="h3">Rs. 5000</Typography>
                     <Typography component="h4">System Cost</Typography>
                 </Box>
                 <Box className={classes.lastBox}>
                    <Typography variant="h3" component="h3">Rs. 5000</Typography>
                     <Typography component="h4">EMI starts at</Typography>
                 </Box>
                   
              </Box>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className={classes.box} m={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        required
                        id="avgbill"
                        name="avgbill"
                        variant="outlined"
                        type="number"
                        label="Average Bill"
                        fullWidth
                        InputProps={{inputProps : {min: 1}}}
                        defaultValue={1}
                        value={avgbill}
                        onChange={(e) => setAvgbill(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl required variant="outlined" fullWidth={true}>
                      <InputLabel htmlFor="systemSize">System Size (in Wp)</InputLabel>
                      <Select
                        id="systemSize"
                        fullWidth={true}
                        value={systemSize}
                        onChange={(e) => setSystemSize(e.target.value)}
                        label="System Size (in Wp)"
                        variant="outlined"
                      >
                        {_.map(systemSizeLIst, (cat) =>
                            <MenuItem value={cat}>{cat}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth={true} required>
                      <FormLabel
                        component="h3"
                        variant="h4"
                        className={classes.label}
                      >
                        Structure Type
                      </FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="type"
                        value={structure}
                        onChange={(e) => setStructure(e.target.value)}
                        className={classes.radioGroup}
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="Standard"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Elevated"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Customize"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth={true} required>
                      <FormLabel component="h3" className={classes.label}>
                        Solar Panel
                      </FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="solar"
                        value={solar}
                        onChange={(e) => setSolar(e.target.value)}
                        className={classes.radioGroup}
                      >
                        <FormControlLabel
                          value="standard"
                          control={<Radio />}
                          label="standard"
                        />
                        <FormControlLabel
                          value="ac"
                          control={<Radio />}
                          label="AC"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                </Grid>
            </Box>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
