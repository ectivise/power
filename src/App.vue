<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
          <v-list dense>
            <v-list-item link to="/">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/gpon">
              <v-list-item-action>
                <v-icon>mdi-router-wireless-settings</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>GPON</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item link to="/olt">
              <v-list-item-action>
                <v-icon>mdi-router-wireless</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>OLT</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item link to="/ont">
              <v-list-item-action>
                <v-icon>mdi-router-network</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>ONT/MDU</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>
          <router-view></router-view>
        </v-content>
        <v-footer color="indigo" app>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
}
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
