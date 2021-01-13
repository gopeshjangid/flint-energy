import axios  from "axios";

const BASE_URI = "https://www.unitgrid.in/v1/";

const sessionId = "g4M5354pmsyLNG3xVbUf"

export const getCategories = async () => {
  const res = await axios.get(BASE_URI + "/systemlist");
  return res.data;
}

export const referral = async (a, b) => {
    const res = await axios.get(BASE_URI + "ch",{
      params: {
        a,
        b
      }
    });
    console.log(res);
    return res.data;
};
export const postSystemDetails = async (activeStep, obj) => {

  let payload = {};

  if(activeStep === 0){
    // ----- make payload object according to format given for API------
    const {systemSize, structure, avgbill, solar} = obj;
    payload = {
      "system_size" : Number(systemSize),
      "structure_type" : Number(structure),
       "avg_bill": Number(avgbill),
    }
    payload["ac_module"] = solar === 'ac';

  }else if(activeStep === 1){
    const {firstName: first_name, lastName: last_name, electricityProvider: electricity_provider, ...rest} = obj
    payload = {first_name, last_name, electricity_provider, ...rest};

  }else if(activeStep === 2){
    const {payment: payment_mode, panNo: pan_number} = obj;
    payload = {payment_mode, pan_number};
    payload["dob"] = obj.dob.valueOf();
  }else{

  }

  console.log(payload)
  const res = await axios.post(BASE_URI + "lp/submit", {
    body: {
      "sessionid": sessionId, // handle later
      "form_part": activeStep,
      "payload": payload
    }
  });
  return res.data;
}

export const submitLeadDetails = async (obj) => {
  const {firstName: first_name, lastName: last_name, mobile, aParam: a_param, bParam: b_param} = obj;
  const payload = {first_name, last_name, "mobile": Number(mobile), a_param, b_param};

  console.log(payload)
  const res = await axios.post(BASE_URI+"lp/lead", {
    body: payload
  },{
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  });

  return res.data;

}

export const verifyOtp = async (obj) => {
  const payload = {
    "mobile": Number(obj.mobile),
    "otp": Number(obj.otp)
  }
  const res = await axios.post(BASE_URI+"lp/verify", {
    body: payload
  });
  return res.data;
}

export const finalSubmission = async (obj) => {
  const payload = {
    "razorpay_payment_id": Number(obj.paymentId),
    "razorpay_invoice_id": Number(obj.invoiceId),
    "razorpay_invoice_status": Number(obj.invoiceStatus),
    "razorpay_invoice_receipt": Number(obj.invoiceReceipt),
    "razorpay_signature": Number(obj.signature)
  }
  const res = await axios.post(BASE_URI+"lp/paycheck", {
    body: payload
  });
  return res.data;
}