import api from "./api";

export default {
  Register(customer) {
    return api().post("cust_register", customer);
  },
  Login(users) {
    return api().post("cust_login", users);
  },
  demo() {
    return api().get("access");
  }
};
