import axios from "axios";
import moment from "moment";

const BASE_URI = "https://www.unitgrid.in/v1/";

const sessionId = "rsUChRJLxZYTEuV50cPF";

export const getCategories = async () => {
  const res = await axios.get(BASE_URI + "/systemlist");
  return res.data;
};

export const referral = async (a, b) => {
  const res = await axios.get(BASE_URI + "ch", {
    params: {
      a,
      b,
    },
  });
  return res.data;
};

export const postSystemDetails = async (activeStep, obj, sessionId) => {
  let payload = {};

  if (activeStep === 0) {
    // ----- make payload object according to format given for API------
    const { systemSize, structure, avgbill, solar } = obj;
    payload = {
      system_size: Number(systemSize),
      structure_type: structure,
      avg_bill: avgbill,
    };
    payload["ac_module"] = solar === "ac";
  } else if (activeStep === 1) {
    const {
      firstName: first_name,
      lastName: last_name,
      electricityProvider: electricity_provider,
      ...rest
    } = obj;
    payload = { first_name, last_name, electricity_provider, ...rest };
  } else if (activeStep === 2) {
    const { payment, panNo: pan_number } = obj;
    payload = { payment_mode: payment === "directonlinepayments", pan_number };
    payload["dob"] = new Date(obj.dob).getTime().toString();
  } else {
  }
  const res = await axios.post(BASE_URI + "lp/submit", {
    sessionid: sessionId, // handle later
    form_part: activeStep,
    payload: payload,
  });
  return res;
};

export const submitLeadDetails = async (obj) => {
  const {
    firstName: first_name,
    lastName: last_name,
    mobile,
    aParam: a_param,
    bParam: b_param,
  } = obj;
  const payload = {
    first_name,
    last_name,
    mobile: Number(mobile),
    a_param,
    b_param,
  };
  const res = await axios.post(BASE_URI + "lp/lead", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const verifyOtp = async (obj) => {
  const payload = {
    mobile: Number(obj.mobile),
    otp: Number(obj.otp),
  };
  const res = await axios.post(BASE_URI + "lp/verify", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const paymentVerify = async (obj) => {
  const payload = {
    razorpay_payment_id: obj.razorpay_payment_id,
    razorpay_invoice_id: obj.razorpay_invoice_id,
    razorpay_invoice_status: obj.razorpay_invoice_status,
    razorpay_invoice_receipt: obj.razorpay_invoice_receipt,
    razorpay_signature: obj.razorpay_signature,
  };
  const res = await axios.post(BASE_URI + "lp/paycheck", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
