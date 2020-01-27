module.exports = {
  setUser(state, payload) {
    state.user = payload;
  },
  unSetUser(state) {
    state.user = "";
  }
};
