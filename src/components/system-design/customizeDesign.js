import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CALC_VARIABLES from "../../../app.config";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Typography } from "@material-ui/core";
import StandardImage from "../../assets/images/standard.png";
import ElevationImage from "../../assets/images/elevation.png";
import _ from "lodash";
import { Field, Label, Select as TSelect } from "theme-ui";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import { getCategories } from "../service/services";
import { clearConfigCache } from "prettier";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {},
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  sizeLogoBox: {
    minHeight: "300px",
    textAlign: "center",
    padding: "20px",
  },
  box: {
    border: "1px solid " + theme.palette.border,
    minHeight: "170px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: "23px",
  },
  radioGroup: {
    flexDirection: "row",
  },
  label: {
    textAlign: "left",
    borderBottom: "0px",
  },
  leftBottomBox: {
    display: "flex",
  },
  infoBox: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  lastBox: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [systemSizeLIst, setSystemSizeList] = useState([]);
  const [systemInfo, setSystemInfo] = useState([]);
  const router = useRouter();
  const [systemSize, setSystemSize] = useState(props.systemDesign.systemSize);
  const [structure, setStructure] = useState(props.systemDesign.structure);
  const [solar, setSolar] = useState(props.systemDesign.solar);
  const bill = router.query ? router.query.bill : 0;
  const [avgbill, setAvgbill] = useState(0);
  const [areaRequired, setareaRequired] = useState(0);
  const [systemCost, setsystemCost] = useState(CALC_VARIABLES.SYSTEM_COST);
  const [netCost, setnetCost] = useState(0);
  const [monthlySaving, setmonthlySaving] = useState(0);
  const [emiFor12, setemiFor12] = useState(0);
  const [emiFor18, setemiFor18] = useState(0);
  
  function getClosestValue(input, array){
    var tempArray = array;
    var index = tempArray.sort().findIndex((item) => {
      return input < item;
    });
    if(index >= 0) {
      return array[index]; 
    } else {
      return null; // no answer
    }
  }
  
  useEffect(() => {
    if(localStorage.getItem("systemSize") && localStorage.getItem("bill")){
        const getSystemSizeList = async () => {
          const res = await getCategories();
          setSystemSizeList(res["syslist"]);
          setSystemInfo(res.systeminfo || []);
          saveSystemInfo(res.systeminfo)
          localStorage.setItem("systemInfo" ,JSON.stringify(res.systeminfo));
        };

    // ---- Uncomment whem API is working ----
      getSystemSizeList();
    }  else {
      router.push("/");
    }
  }, []);

  const saveSystemInfo = (systemList ) =>{
    const actualSize = localStorage.getItem("systemSize")*1000;
    const list = systemList.map(item => item.size);
    const size = getClosestValue(actualSize, list);
    const sysInfo  = systemList.filter(item => item.size === size)
     const info =   { 
         SYSTEM_COST : sysInfo.length && sysInfo[0].cost || 0,
          SUBSIDY: sysInfo.length && sysInfo[0].subsidy || 0,
           STRUCTURE_COST: sysInfo.length && sysInfo[0].struct || 0
     }

     localStorage.setItem("SYSTEM_COST",info.SYSTEM_COST)
     localStorage.setItem("SUBSIDY",info.SUBSIDY)
     localStorage.setItem("STRUCTURE_COST",info.STRUCTURE_COST)
  }

  const getSystemInfo = (size ) =>{
    let sysInfo =  localStorage.getItem("systemInfo");
    sysInfo = sysInfo && JSON.parse(sysInfo) || [];
     sysInfo  = sysInfo.filter(item => item.size === size)
     return  { 
         SYSTEM_COST : sysInfo.length && sysInfo[0].cost || 0,
          SUBSIDY: sysInfo.length && sysInfo[0].subsidy || 0,
           STRUCTURE_COST: sysInfo.length && sysInfo[0].struct || 0
     }
  }

  useEffect(() => {
    setAvgbill(localStorage.getItem("bill"));
    if(localStorage.getItem("systemSize")){
      setCalculation(localStorage.getItem("systemSize"));
    }
  }, [systemSizeLIst]);

  useEffect(() => {
    const obj = {
      systemSize,
      structure,
      solar,
      avgbill,
      areaRequired,
      netCost,
      emiFor12,
      emiFor18,
    };
    props.handler(obj);
  }, [systemSize, structure, solar, avgbill]);

  const getImage = (type) => {
    switch (type) {
      case "0":
        return StandardImage;
        break;
      case "1":
      case "2":
        return ElevationImage;
        break;
      default:
        return ElevationImage;
        break;
    }
  };

  const getMeterCharge = (size) =>{
    const city = localStorage.getItem("city");
    const meterCharge =
    size > 6000
      ? city && city.toLowerCase() === "torrentahmedabad" ||
       city && city.toLowerCase() === "torrentsurat"
        ? 16835.74
        : 15166.51
      : city && city.toLowerCase() === "torrentahmedabad" ||
        city && city.toLowerCase() === "torrentsurat"
      ? 5396.86
      : 4045.08;
      return meterCharge;
  }
  const setCalculation = async (value)=>{
    setSystemSize(value);
    setareaRequired(value);
    const actualSize = value*1000;
    let meterCharge = getMeterCharge(actualSize);
    // const SYSTEM_COST = Number(localStorage.getItem("SYSTEM_COST"))
    // const  SUBSIDY = Number(localStorage.getItem("SUBSIDY"))
    // const STRUCTURE_COST =  Number(localStorage.getItem("STRUCTURE_COST"))
    const  {SYSTEM_COST,SUBSIDY,  STRUCTURE_COST} =  getSystemInfo(actualSize);
    setnetCost(SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge);
    let cost = SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge;
    setsystemCost(cost);
    setmonthlySaving(Number(value * 720).toFixed(2));
    let downPayment = cost * 0.3;
    setemiFor12((((cost - downPayment) * 1.12) / 12).toFixed(2));
    setemiFor18((((cost - downPayment) * 1.18) / 18).toFixed(2));
  }

  const onChangeHandler = (e) => {
    setSystemSize(e.target.value);
    setareaRequired(e.target.value);
    const actualSize = e.target.value*1000;
    let meterCharge = getMeterCharge(actualSize);
    let { SYSTEM_COST, SUBSIDY, STRUCTURE_COST } = getSystemInfo(e.target.value*1000);
    setnetCost(SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge);
    let cost = SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge;

    setsystemCost(cost);
    setmonthlySaving(Number(e.target.value * 720).toFixed(2));
    let downPayment = cost * 0.3;
    setemiFor12((((cost - downPayment) * 1.12) / 12).toFixed(2));
    setemiFor18((((cost - downPayment) * 1.18) / 18).toFixed(2));
    if(localStorage){
      localStorage.setItem("SYSTEM_COST" ,SYSTEM_COST);
      localStorage.setItem("SUBSIDY" ,SUBSIDY);
      localStorage.setItem("STRUCTURE_COST" ,STRUCTURE_COST);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} md={7}>
          <Grid container spacing={3} direction="column">
            <Box className={classes.sizeLogoBox} m={4}>
              {structure ? (
                <img  src={getImage(structure)} height={250} width={320} />
              ) : (
                <Typography variant="h4" component="h4" align="center">
                  Select System Size
                </Typography>
              )}
            </Box>
            <Box
              className={classes.leftBottomBox}
              alignContent="center"
              justifyContent="space-around"
            >
              <Box className={classes.infoBox}>
                <Typography variant="h5" component="h3">
                  {areaRequired} Sq. Feet
                </Typography>
                <Typography component="h6">Rooftop Area</Typography>
              </Box>
              <Box className={classes.infoBox}>
                <Typography variant="h5" component="h3">
                  &#x20B9; {systemCost}
                </Typography>
                <Typography component="h6">System Cost</Typography>
              </Box>
              <Box className={classes.lastBox}>
                <Typography variant="h5" component="h3">
                  &#x20B9; {monthlySaving}{" "}
                </Typography>
                <Typography component="h6">Monthly Saving</Typography>
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
                      <Label htmlFor="Suggested System Size (in KWp)">
                        Suggested System Size (in KWP)
                      </Label>
                      <TSelect
                        name="systemSize"
                        mb={3}
                        mt={3}
                        id="systemSize"
                        fullWidth={true}
                        value={systemSize}
                        onChange={onChangeHandler}
                      >
                        <option value="">Select System Size</option>
                        {_.map(systemSizeLIst, (cat, index) => (
                          <option key={index} value={cat / 1000}>
                            {cat / 1000}
                          </option>
                        ))}
                      </TSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl required variant="outlined" fullWidth={true}>
                      <Label htmlFor="StructureType">Structure Type</Label>
                      <TSelect
                        name="structureType"
                        mb={3}
                        mt={3}
                        id="structureType"
                        fullWidth={true}
                        value={structure}
                        onChange={(e) => setStructure(e.target.value)}
                      >
                        <option key="size-1" value="">
                          Choose Structure Type{" "}
                        </option>
                        <option key="size-2" value="0">
                          Standard
                        </option>
                        <option key="size-3"  value="1">
                          Elevated
                        </option>
                        <option key="size-4" value="2">
                          Customize
                        </option>
                      </TSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth={true}>
                      <Label htmlFor="Solar Panel">Solar Panel</Label>
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
                          label="AC Module"
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
