import api from "../api";

export default {
  saveBill(value) {
    return api().post("savebill", value);
  },
  savePayments(value) {
    return api().post("savepayment", value);
  },
  viewPayment(cusId) {
    return api().get("orderpay/" + cusId);
  },
  viewOrdered(value) {
    return api().get("vieworder/" + value);
  }
};
