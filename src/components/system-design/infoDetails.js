import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Cities from "../data/district.json";

export default function AddressForm(props) {
  const [firstName, setFirstName] = useState(props.personalDetails.firstName);
  const [lastName, setLastName] = useState(props.personalDetails.lastName);
  const [email, setEmail] = useState(props.personalDetails.email);
  const [address, setAddress] = useState(props.personalDetails.address);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState(props.personalDetails.district);
  const [pincode, setPincode] = useState(props.personalDetails.pincode);
  const [electricityProvider, setElectricityProvider] = useState(
    props.personalDetails.electricityProvider
  );
  const [consent, setConsent] = useState(props.personalDetails.consent);
  const [error, seterror] = useState({
    errorField: "",
    errorMsg: "",
  });

  const onChangeHandler = (value, fieldName, fieldValue) => {
    if (!value) {
      seterror({
        errorMsg: `Please enter ${fieldName}`,
        errorField: fieldValue,
      });
    }
    if (value)
      seterror({
        errorMsg: ``,
        errorField: ``,
      });
  };

  const providersList = [
    "UGVCL",
    "PGVCL",
    "MGVCL",
    "DGVCL",
    "Torrent Power Ahmedabad",
    "Torrent Power Surat",
  ];
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
      consent,
    };
    props.handler(obj);
  }, [
    firstName,
    lastName,
    email,
    address,
    pincode,
    electricityProvider,
    state,
    district,
    consent,
  ]);

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
            inputProps={{ maxLength: 50 }}
            fullWidth
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              onChangeHandler(e.target.value, "First name", "firstName");
            }}
            error={error.errorField === "firstName"}
            helperText={error.errorField === "firstName" && error.errorMsg}
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
            inputProps={{ maxLength: 50 }}
            fullWidth
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              onChangeHandler(e.target.value, "Last name", "lastName");
            }}
            error={error.errorField === "lastName"}
            helperText={error.errorField === "lastName" && error.errorMsg}
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
            onChange={(e) => {
              setAddress(e.target.value);
              onChangeHandler(e.target.value, "Address", "address");
            }}
            error={error.errorField === "address"}
            helperText={error.errorField === "address" && error.errorMsg}
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
            onChange={(e) => {
              setEmail(e.target.value);
              onChangeHandler(e.target.value, "Email", "email");
            }}
            error={error.errorField === "email"}
            helperText={error.errorField === "email" && error.errorMsg}
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
            inputProps={{ maxLength: 6 }}
            fullWidth
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              onChangeHandler(e.target.value, "PinCode", "pincode");
            }}
            error={error.errorField === "pincode"}
            helperText={error.errorField === "pincode" && error.errorMsg}
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
              onChange={(e) => {
                setElectricityProvider(e.target.value);
                onChangeHandler(
                  e.target.value,
                  "Electricity Provider",
                  "provider"
                );
              }}
              error={error.errorField === "provider"}
              helperText={error.errorField === "provider" && error.errorMsg}
            >
              {_.map(providersList, (cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
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
              <MenuItem selected={1} value={"Gujarat"}>
                {"Gujarat"}
              </MenuItem>
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
              {Cities.districts.map((city, index) => (
                <option key={"city" + index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
