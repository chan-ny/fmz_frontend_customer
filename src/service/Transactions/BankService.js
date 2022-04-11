import api from "../api";

export default {
  showBank() {
    return api().get("bank");
  },
  selectBank(bkId) {
    return api().get("bank/" + bkId);
  }
};
