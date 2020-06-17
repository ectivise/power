<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" md="4" offset-md="2">
        <v-card>
          <v-card-title>
            <v-icon left>mdi-router-wireless</v-icon>
            {{oltlist[0].device.name}}
          </v-card-title>
          <v-card-text>
            Power: {{oltlist[0].device.power.power}}kw
            <v-chip :color="getColor(oltlist[0].device.redundant)" class="mx-2" dark>{{oltlist[0].device.redundant }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card>
            <v-card-title>
            <v-icon left>mdi-router-wireless</v-icon>
            {{oltlist[1].device.name}}
          </v-card-title>
          <v-card-text>
            Power: {{oltlist[1].device.power.power}}kw
            <v-chip :color="getColor(oltlist[1].device.redundant)" class="mx-2" dark>{{oltlist[1].device.redundant }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "oltcard",
  data() {
    return {};
  },
  computed: {
    oltlist() {
      if (this.$store.getters.oltlist == undefined) {
        return [];
      } else {
        return this.$store.getters.oltlist;
      }
    }
  },
  created() {
    this.get_ontlist();
  },
  methods: {
    get_ontlist() {
      this.$store.dispatch("get_oltlist");
    },
    getColor(status) {
      switch (status) {
        case "Active":
          return "green";
        case "Standby":
          return "orange";
      }
    }
  }
};
</script>

<style>
</style>