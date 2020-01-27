module.exports = {
  setUser(state, payload) {
    state.commit("setUser", payload);
  },
  unSetUser(state) {
    state.commit("unSetUser");
  }
};
