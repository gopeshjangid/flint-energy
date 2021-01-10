import { axios } from "axios";

export const getCategories = async () => {
  const res = await axios.get("URL" + "/v1/systemlist");
  return res;
};

export const postSystemDetails = async (activeStep, obj) => {
  let payload = {};

  if(activeStep === 0){
    // ----- make payload object according to format given for API------
    const {systemSize: system_size, structure: structure_type, avgbill: avg_bill} = obj;
    payload = {system_size, structure_type, avg_bill}
    payload["ac_module"] = obj.solar === 'ac';

  }else if(activeStep === 1){
    const {firstName: first_name, lastName: last_name, electricityProvider: electricity_provider, ...rest} = obj
    payload = {first_name, last_name, electricity_provider, ...rest};

  }else if(activeStep === 2){
    const {payment: payment_mode, panNo: pan_number} = obj;
    payload = {payment_mode, pan_number};
    payload["dob"] = obj.dob.valueOf();
  }else{

  }

  const res = await axios.post("URL_API", {
    body: {
      "form_part": activeStep,
      "payload": payload
    }
  });
  return res;
}
