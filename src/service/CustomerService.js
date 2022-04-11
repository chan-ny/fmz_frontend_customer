import api from "./api";

export default {
  viewCustomer(email) {
    return api().get("customer/" + email);
  },

  editCustomer(customer) {
    return api().put("customer/" + customer.cusId, customer);
  }
};
