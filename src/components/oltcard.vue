<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" md="4" offset-md="2">
        <v-card>
          <v-card-title>
            <v-icon left>mdi-router-network</v-icon>
            {{oltlist[0].device.name}}
          </v-card-title>
          <v-card-text align="left" class="ma-2 title">
            IP: {{oltlist[0].device.IP_Address}}<br>
            Power: {{oltlist[0].device.power.power}}kw<br>
            Optical RX: {{oltlist[0].optical.rx}}<br>
            Optical TX: {{oltlist[0].optical.tx}}<br>
            <v-chip :color="getColor(oltlist[0].device.redundant)" class="ma-2" dark>{{oltlist[0].device.redundant }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card>
            <v-card-title>
            <v-icon left>mdi-router-network</v-icon>
            {{oltlist[1].device.name}}
          </v-card-title>
          <v-card-text align="left" class="ma-2 title">
            IP: {{oltlist[1].device.IP_Address}}<br>
            Power: {{oltlist[1].device.power.power}}kw<br>
            Optical RX: {{oltlist[1].optical.rx}}<br>
            Optical TX: {{oltlist[1].optical.tx}}<br>
            <v-chip :color="getColor(oltlist[1].device.redundant)" class="ma-2" dark>{{oltlist[1].device.redundant }}</v-chip>
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
    this.get_oltlist();
  },
  methods: {
    get_oltlist() {
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