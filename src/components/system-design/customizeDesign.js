import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import {useRouter} from  "next/router";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Image from "next/image";
import { Typography } from "@material-ui/core";
import StandardImage from  "../../assets/images/standard.png";
import ElevationImage from  "../../assets/images/elevation.png";
import _ from "lodash";
import { Field ,Label, Select as TSelect } from 'theme-ui';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import { getCategories } from "../service/services";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {}
    },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sizeLogoBox : {
    minHeight : '300px',
    textAlign : 'center',
    padding : '20px'
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
  const router = useRouter();
  const [systemSize, setSystemSize] = useState("");
  const [structure, setStructure] = useState("");
  const [solar, setSolar] = useState("");
  const  bill = router.query ? router.query.bill : 0;
  const [avgbill, setAvgbill] = useState(bill);
  useEffect(() => {
    setAvgbill(bill)
  },[]);
  useEffect(() => {
    const getSystemSizeList = async () => {
      const res = await getCategories();
      setSystemSizeList(res["syslist"]);
    }

    // ---- Uncomment whem API is working ----
    getSystemSizeList();

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

  const getImage = (type) =>{
    switch (type) {
      case 'Standard':
        return StandardImage
        break;
      case 'Elevated':
      case 'Customize':
        return ElevationImage
        break;  
      default:
        return '/no.png'
        break;
    }
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} md={7}>
            <Grid container spacing={3} direction="column">
              <Box className={classes.sizeLogoBox} m={4}>
               {structure ?  <Image src={getImage(structure)} height={250} width={320} />
                   : <Typography variant="h4" component="h4" align="center"  >Select System Size</Typography>
                  }
              </Box>
              <Box className={classes.leftBottomBox} alignContent="center" justifyContent="space-around">
                 <Box className={classes.infoBox} > 
                     <Typography variant="h5" component="h3">350 SF</Typography>
                     <Typography  component="h6">Rooftop Area</Typography>
                  </Box>
                 <Box className={classes.infoBox}>
                    <Typography variant="h5" component="h3">&#x20B9; 5,000</Typography>
                     <Typography component="h6">System Cost</Typography>
                 </Box>
                 <Box className={classes.lastBox}>
                    <Typography variant="h5" component="h3">&#x20B9; 5,000</Typography>
                     <Typography component="h6">Starting EMI</Typography>
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
                    <FormControl required variant="outlined" fullWidth={true}>
                      <Label htmlFor='Suggested System Size (in KWp)'>Suggested System Size (in KWP)</Label>
                        <TSelect name='systemSize' mb={3} mt={3}
                          id="systemSize"
                          fullWidth={true}
                          value={systemSize}
                          onChange={(e) => setSystemSize(e.target.value)}
                      >
                      <option>Select System Size</option>
                       {_.map(systemSizeLIst, (cat,index) => <option key={cat.id} value={cat}>{cat}</option> )}
                       
                      </TSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>

                  <FormControl required variant="outlined" fullWidth={true}>
                      <Label htmlFor='Structure Type'>Structure Type</Label>
                      <TSelect name='structureType' mb={3} mt={3}
                          id="structureType"
                          fullWidth={true}
                          value={structure}
                          onChange={(e) => setStructure(e.target.value)}
                      >
                       <option key="size-1" value="">Choose Structure Type </option>
                       <option key="size-2" value="Standard">Standard</option>
                       <option key="size-3" value="Elevated">Elevated</option>
                       <option key="size-4" value="Customize">Customize</option>
                      </TSelect>
                    </FormControl>
                    </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth={true}>
                    <Label htmlFor='Solar Panel'>Solar Panel</Label>
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
                          label="Standard"
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