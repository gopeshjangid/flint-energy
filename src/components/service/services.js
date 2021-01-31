import axios  from "axios";

const BASE_URI = "https://www.unitgrid.in/v1/";

const sessionId = "rsUChRJLxZYTEuV50cPF"

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
export const postSystemDetails = async (activeStep, obj, sessionId) => {

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
    const {payment, panNo: pan_number} = obj;
    payload = {"payment_mode" : payment === "directonlinepayments", pan_number};
    payload["dob"] = obj.dob.getTime();
  }else{

  }

  console.log(sessionId + " " + activeStep)
  console.log(payload)
  const res = await axios.post(BASE_URI + "lp/submit", {
      "sessionid": sessionId, // handle later
      "form_part": activeStep,
      "payload": payload
  });
  return res.data;
}

export const submitLeadDetails = async (obj) => {
  const {firstName: first_name, lastName: last_name, mobile, aParam: a_param, bParam: b_param} = obj;
  const payload = {first_name, last_name, mobile: Number(mobile), a_param, b_param};

  console.log(payload)
  const res = await axios.post(BASE_URI+"lp/lead",payload,{
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.data;

}

export const verifyOtp = async (obj) => {
  const payload = {
    mobile: Number(obj.mobile),
    otp: Number(obj.otp)
  }
  console.log(payload)
  const res = await axios.post(BASE_URI+"lp/verify",payload ,{
    headers: {
      'Content-Type': 'application/json'
    }
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
  console.log(payload)
  const res = await axios.post(BASE_URI+"lp/paycheck", payload);
  return res.data;
}