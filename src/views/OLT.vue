<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <olttable />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="6"> 
        <v-card>
          <v-card-title>
            <v-icon left>mdi-router-network</v-icon>
            {{oltlist[0].device.name}}<v-chip :color="getColor(oltlist[0].device.redundant)" class="ma-2" dark small>{{oltlist[0].device.redundant }}</v-chip>
          </v-card-title>
          <v-card-text align="left">
            <h3>OLT Details</h3>
            IP Addess: {{oltlist[0].device.IP_Address}}<br>
            MCUD: {{oltlist[0].mcud}}<br>
            MPWD: {{oltlist[0].mpwd}}<br>
            GPFD: {{oltlist[0].gpfd}}<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Health</h3>
            Bandwidth: {{oltlist[0].device.health.bandwidth}}%<br>
            CPU: {{oltlist[0].device.health.cpu}}%<br>
            HDD: {{oltlist[0].device.health.hdd}}%<br>
            MEM: {{oltlist[0].device.health.mem}}%<br>
            Temperature: {{oltlist[0].device.health.temperature}}°C<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Optical</h3>
            Optical RX: {{oltlist[0].optical.rx}}<br>
            Optical TX: {{oltlist[0].optical.tx}}<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Power</h3>
            <p>
              Power: {{oltlist[0].device.power.power}}<br>
              Cost: ${{oltlist[0].device.power.power * 10}}<br>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>
            <v-icon left>mdi-router-network</v-icon>
            {{oltlist[1].device.name}}<v-chip :color="getColor(oltlist[1].device.redundant)" class="ma-2" dark small>{{oltlist[1].device.redundant }}</v-chip>
          </v-card-title>
          <v-card-text align="left">
            <h3>OLT Details</h3>
            IP Addess: {{oltlist[1].device.IP_Address}}<br>
            MCUD: {{oltlist[1].mcud}}<br>
            MPWD: {{oltlist[1].mpwd}}<br>
            GPFD: {{oltlist[1].gpfd}}<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Health</h3>
            Bandwidth: {{oltlist[1].device.health.bandwidth}}%<br>
            CPU: {{oltlist[1].device.health.cpu}}%<br>
            HDD: {{oltlist[1].device.health.hdd}}%<br>
            MEM: {{oltlist[1].device.health.mem}}%<br>
            Temperature: {{oltlist[1].device.health.temperature}}°C<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Optical</h3>
            Optical RX: {{oltlist[1].optical.rx}}<br>
            Optical TX: {{oltlist[1].optical.tx}}<br>
            <v-divider class="mb-3"></v-divider>
            <h3>Device Power</h3>
            <p>
              Power: {{oltlist[1].device.power.power}}<br>
              Cost:${{oltlist[1].device.power.power * 10}}<br>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>
            <h3>OLT A</h3>
          </v-card-title>
          <v-card-text>
            <h5>Olt A Power 1 Day</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-a-pwr-24h.jpg"></v-img>
            <h5>Olt A Power 1 Week</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-a-pwr-1w.jpg"></v-img>
            <h5>Olt A Power 1 Month</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-a-pwr-1m.jpg"></v-img>
            <h5>Olt A Power 1 Year</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-a-pwr-1y.jpg"></v-img>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>
            <h3>OLT B</h3>
          </v-card-title>
          <v-card-text>
            <h5>Olt B Power 1 Month</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-b-pwr-1m.jpg"></v-img>
            <h5>Olt B Power 1 Year</h5>
            <v-img src="http://dev1.ectivisecloud.com:8081/images/olt-b-pwr-1y.jpg"></v-img>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import olttable from "../components/olttable.vue";

// import port_onu_table from "../components/port_onu_table.vue";

export default {
  components: {
    olttable,
    // port_onu_table,
  },
  data(){
    return{
      chartdata: {
        "15/6": 3,
        "16/6": 3,
        "17/6": 3.5,
        "18/6": 3
      },
    }
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
    },
  }
};
</script>

<style>
</style>