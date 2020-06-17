import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frontend_token: process.env.VUE_APP_FRONTEND_TOKEN,
    backend_api: process.env.VUE_APP_BACKEND_API,
    ontlist: [],
    oltlist: [],
  },
  mutations: {
    get_ontlist(state, get_ontresult) {
      state.ontlist = get_ontresult;
    },
    get_oltlist(state, get_oltresult) {
      state.oltlist = get_oltresult;
    },
  },
  actions: {
    async get_ontlist(context) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Cookie",
        "connect.sid=s%3AQgVmSaQ08mSTQXSkCt3sb7N2VAyuUBxJ.APsiJfFv53n84QKEBwTTQfTHKyTJtqA8HP54UmzPwEU"
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("token", this.state.frontend_token);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      await fetch(this.state.backend_api + "devices/get_ont", requestOptions)
        .then((response) => response.text())
        .then((result) => context.commit("get_ontlist", JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },

    async get_oltlist(context){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Cookie", "connect.sid=s%3AZ9KsmIEdraTtPw3Om_j_cfw76Y01kqe4.uANu%2F%2F0eRUB%2FNixL41JyVzcS5YY%2FDudEOhBK7ZgnziU");

      var urlencoded = new URLSearchParams();
      urlencoded.append("token", this.state.frontend_token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      await fetch( this.state.backend_api + "devices/get_olt", requestOptions)
        .then(response => response.text())
        .then(result => context.commit("get_oltlist", JSON.parse(result)))
        .catch(error => console.log('error', error));
    }
  },
  getters: {
    ontlist(state) {
      return state.ontlist.data;
    },
    oltlist(state){
      return state.oltlist.data;
    },
  },
  modules: {},
});
