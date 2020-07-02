import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frontend_token: process.env.VUE_APP_FRONTEND_TOKEN,
    backend_api: process.env.VUE_APP_BACKEND_API,
    ontlist: [],
    oltlist: [],
    login:false,
    loginresult:{},
    opticresult:{},
    snackbar:{},
  },
  mutations: {
    get_ontlist(state, get_ontresult) {
      state.ontlist = get_ontresult;
    },
    get_oltlist(state, get_oltresult) {
      state.oltlist = get_oltresult;
    },
    loginresult(state, result) {
      state.loginresult = result;
    },
    login(state) {
      state.login = true;
    },
    logout(state){
      state.login = false;
    },
    ont_opticdata(state,result){
      state.opticresult = result;
    },
    set_snackbar(state, snackbar) {
      state.snackbar = snackbar;
    },
    synclogin(state,loginstatus){
      state.login = loginstatus;
    },
  },
  actions: {
    setsnackbar(context, snackbar) {
      context.commit("set_snackbar", snackbar);
    },
    async get_ont_opticdata(context,ontname){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Cookie", "connect.sid=s%3AX7x6Uu9x_ZsIQYGp9-cIxaqCegXOgrU9.LbbaIgHZhaKozMfeKYJL7d6SW9Vf9zDeaoy1BO2mBLU");

      var urlencoded = new URLSearchParams();
      urlencoded.append("token", this.state.frontend_token);
      urlencoded.append("name", ontname);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      await fetch(this.state.backend_api+"devices/get_opticHistory", requestOptions)
        .then(response => response.text())
        .then(result => context.commit("ont_opticdata", JSON.parse(result)))
        .catch(error => console.log('error', error));
    },
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
    },

    // users
    async logingetotp(context, logininfo) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Cookie",
        "connect.sid=s%3ATWx4m0WVrO_XDoQDLF7VwL0MZ4zyHjPN.jaOzAR5BM1eRIeLjrslG85GS7EC%2BY518B5gt%2B622jjE"
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("type", "getotp");
      urlencoded.append("mobile", logininfo.phonenumber);
      urlencoded.append("token", this.state.frontend_token);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      await fetch(this.state.backend_api + "users/login", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },

    async login2fa(context, logininfo) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Cookie",
        "connect.sid=s%3AMR_ZnUOs2qRGLspZVUkCJx527ydYybpf.2sEwq6D5JvZbHR4yaoj837mAT7bhBuAMyIBJo%2BOp2DA"
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("type", "2fa");
      urlencoded.append("mobile", logininfo.phonenumber);
      urlencoded.append("token", this.state.frontend_token);
      urlencoded.append("otp", logininfo.otp);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      await fetch(this.state.backend_api + "users/login", requestOptions)
        .then((response) => response.text())
        .then((result) => context.commit("loginresult", JSON.parse(result)))
        .catch((error) => console.log("error", error));

      context.dispatch("setsnackbar", {
        showing: true,
        text: this.state.loginresult.message,
      });
    },
  },
  getters: {
    ontlist(state) {
      return state.ontlist.data;
    },
    // ont(state,ontname) {
    //   var ontlist = state.ontlist.data;
    //   ontlist = ontlist.filter(ont => ont.device.name == ontname);

    //   return ontlist[0]
    // },
    ont:(state) => (ontname) => {
      return state.ontlist.data.find(ont => ont.device.name === ontname)
    },
    oltlist(state){
      return state.oltlist.data;
    },
    loginerrorcode(state) {
      return state.loginresult.errorCode;
    },
    login(state) {
      return state.login;
    },
    ont_opticdata(state){
      return state.opticresult.data;
    },
  },
  modules: {},
});
