import api from "./api";

export default {
  checkPhone(phone) {
    return api().post("checkphone", phone);
  },
  SMSPhone(phone) {
    return api().post("SMS", phone);
  },
  checkOTP(otp) {
    return api().get("otp/" + otp);
  },
  resetPassword(otp, value) {
    return api().put("resetpassword/" + otp, value);
  },
  changePassword(ID, value) {
    return api().put("changpwd/" + ID, value);
  }
};
