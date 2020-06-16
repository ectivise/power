import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frontend_token: "ectivisecloudDBAuthCode:b84846daf467cede0ee462d04bcd0ade",
    backend_api: "http://dev1.ectivisecloud.com:8081/api/",
    ontlist: [],
    oltlist: [
      {
        optical: {
          rx: 0,
          tx: 0,
        },
        device: {
          power: {
            power: 0,
            voltage: 0,
            current: 0,
          },
          name: "LG-M01FCC-OLT01",
          IP_Address: "",
          category: "gpon",
          lastdowncause: "",
          redundant: "Active",
          _id: "5ee5e0b6b8b1e359fc09928f",
        },
      },
      {
        optical: {
          rx: 0,
          tx: 0,
        },
        device: {
          power: {
            power: 0,
            voltage: 0,
            current: 0,
          },
          name: "LG-M01FCC-OLT02",
          IP_Address: "",
          category: "gpon",
          lastdowncause: "",
          redundant: "Standby",
          _id: "5ee5e0b6b8b1e359fc09928f",
        },
      },
    ],
  },
  mutations: {
    get_ontlist(state, get_ontresult) {
      state.ontlist = get_ontresult;
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
  },
  getters: {
    ontlist(state) {
      return state.ontlist.data;
    },
    oltlist(state){
      return state.oltlist;
    }
  },
  modules: {},
});
