import api from "../api";

export default {
  sellBest() {
    return api().get("sellbest");
  },
  viewOrderPDF(invId) {
    return api().get("viewpdf/"+invId);
  },

};
