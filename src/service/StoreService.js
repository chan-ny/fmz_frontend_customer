import api from "./api";

export default {
  selectStore() {
    return api().get("select_store");
  }
};
