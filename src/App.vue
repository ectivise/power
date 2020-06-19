<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
          <v-list dense>
            <v-list-item link to="/" :disabled="disabled">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/gpon" :disabled="disabled">
              <v-list-item-action>
                <v-icon>mdi-router-wireless-settings</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>GPON</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/analysis" :disabled="disabled">
              <v-list-item-action>
                <v-icon>mdi-database-search</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Analysis</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item link to="/ont">
              <v-list-item-action>
                <v-icon>mdi-router-network</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>ONT/MDU</v-list-item-title>
              </v-list-item-content>
            </v-list-item>-->
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="green" dark hide-on-scroll>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Power Moniter</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="login" @click="logout()" dark color="primary">Log Out</v-btn>
        </v-app-bar>

        <v-content>
          <router-view></router-view>
        </v-content>
        <v-snackbar v-model="snackbar.showing" :timeout="3000" color="primary">
          {{snackbar.text}}
          <template v-slot:action="{attrs}">
            <v-btn text @click="snackbar.showing = false" v-bind="attrs">close</v-btn>
          </template>
        </v-snackbar>
        <v-footer color="green" app></v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    login() {
      return this.$store.state.login;
    },
    disabled() {
      if (this.login == true) {
        return false;
      } else {
        return true;
      }
    },
    ...mapState(['snackbar'])
  },
  watch: {
    $route(to,from) {
      if (
        (to.name == "Home" || to.name == "GPON" || to.name == "Analysis") &&
        this.login == false
      ) {
        let url = "/login";
        this.$router.push(url);
      }else if(this.login == true && to.name == "Login"){
        let url = from.fullPath;
        this.$router.push(url);
      }
    }
  },
  created() {
    this.syncsession();
    this.tologin();

  },
  methods: {
    tologin() {
      let url = "/login";
      this.$router.push(url);
    },
    async logout() {
      // await this.$store.dispatch("logout",this.$store.getters.currentuser.mobile);
      this.$store.commit("logout");
      this.loginstatus();
      this.tologin();
    },
    loginstatus() {
      var obj = {
        login: this.$store.getters.login
      };
      sessionStorage.setItem("data", JSON.stringify(obj));
    },
    syncsession() {
      if(sessionStorage.getItem("data") == null){
          var obj = {
          login: false
        };
        sessionStorage.setItem("data", JSON.stringify(obj));
      }else{
          this.$store.commit(
          "synclogin",
          JSON.parse(sessionStorage.getItem("data")).login
        );
      }

      
    }
  }
};
</script>>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
