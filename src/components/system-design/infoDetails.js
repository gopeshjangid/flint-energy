import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Cities from "../data/district.json";
export default function AddressForm(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [pincode, setPincode] = useState('')
  const [electricityProvider, setElectricityProvider] = useState('');
  const [consent, setConsent] = useState(false);

  const providersList = ["UGVCL", "PGVCL", "MGVCL", "DGVCL", "Torrent Power Ahmedabad", "Torrent Power Surat"];
  const districtList = ["dummy_district1", "dummy_district2"];
  
  useEffect(() => {
    const obj = {
      firstName,
      lastName,
      email,
      address,
      pincode,
      electricityProvider,
      state,
      district,
      consent
    }
    props.handler(obj);
  }, [firstName, lastName, email, address, pincode, electricityProvider, state, district, consent]);


  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom={6}>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            variant="outlined"
            type="text"
            inputProps={{maxLength: 50}}
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            variant="outlined"
            type="text"
            inputProps={{maxLength: 50}}
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              required
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            type="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pincode"
            variant="outlined"
            type="tel"
            name="pincode"
            label="PinCode"
            inputProps={{maxLength: 6}}
            fullWidth
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required variant="outlined" fullWidth={true}>
            <InputLabel htmlFor="provider">Electricity Provider</InputLabel>
            <Select
                variant="outlined"
                id="provider"
                name="provider"
                label="Electricity Provider"
                fullWidth
                value={electricityProvider}
                onChange={(e) => setElectricityProvider(e.target.value)}
            >
              {_.map(providersList, (cat) =>
                  <MenuItem value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required variant="outlined" fullWidth={true}>
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
                variant="outlined"
                id="state"
                name="state"
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value={"Gujarat"}>{"Gujarat"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required variant="outlined" fullWidth={true}>
            <InputLabel htmlFor="district">District</InputLabel>
            <Select
                variant="outlined"
                id="district"
                name="district"
                label="District"
                fullWidth
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
            >
            <option value="">Select District</option>
           {
             Cities.districts.map( (city ,index) => <option key={"city"+index} value={city.city}>{city.city}</option>)
           }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox required checked={consent} onChange={(e) => setConsent(e.target.checked)} color="secondary" name="saveAddress" value="yes" />}
            label="I have read Flint Energy Privacy Policy"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}