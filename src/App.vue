<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>Power Moniter</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <Power/>
    </v-content>
  </v-app>
</template>

<script>
import Power from './components/Power';

export default {
  name: 'App',

  components: {
    Power,
  },

  data: () => ({
    //
  }),
};
</script>
