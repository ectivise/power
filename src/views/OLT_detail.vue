<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h3>{{oltname}}</h3>
          </v-card-title>
          <v-card-text align="left">
            <h3>OLT Details</h3>Status:
            <v-chip
              :color="getColor(olt[0].device.redundant)"
              class="ma-2"
              dark
              small
            >{{olt[0].device.redundant }}</v-chip>
            <br />
            IP Address: {{olt[0].device.IP_Address}}
            <br />
            <v-divider class="mb-3"></v-divider>
            <h3>Health Details</h3>
            Bandwidth: {{olt[0].device.health.bandwidth }}%
            <br />
            CPU: {{olt[0].device.health.cpu }}%
            <br />
            Mem: {{olt[0].device.health.mem }}%
            <br />
            HDD: {{olt[0].device.health.hdd }}%
            <br />
            Temperature: {{olt[0].device.health.temperature }}°C
            <br />
            <v-divider class="mb-3"></v-divider>
            <h3>Power Details</h3>
            Power: {{olt[0].device.power.power}}w
            <br />
            <v-divider class="mb-3"></v-divider>
            <h3>Other Details</h3>
            MCUD: {{olt[0].mcud}}
            <br />
            MPWD: {{olt[0].mpwd}}
            <br />
            GPFD: {{olt[0].gpfd}}
            <br />
            <v-divider class="mb-3"></v-divider>
            <h3>Optical Power Budget</h3>
            RX: {{olt[0].optical.rx}}
            <line-chart
              :data="rxdata"
              xtitle="Date"
              ytitle="Optical RX"
              :curve="false"
              class="mt-3"
            ></line-chart>
            TX: {{olt[0].optical.tx}}
            <line-chart
              :data="rxdata"
              xtitle="Date"
              ytitle="Optical RX"
              :curve="false"
              class="mt-3"
            ></line-chart>
            <v-divider class="mb-3"></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <port_ont_table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import port_ont_table from "../components/port_ont_table.vue"

export default {
  components:{
      port_ont_table,
  },
  name: "olt_details",
  data() {
    return {
      oltname: this.$route.params.olt_name,
      rxdata: {
        "15/6": 3,
        "16/6": 3,
        "17/6": 3.5,
        "18/6": 3
      },
      txdata: {
        "15/6": 3,
        "16/6": 3,
        "17/6": 3.5,
        "18/6": 3
      }
    };
  },
  computed: {
    olt() {
      var oltlist = this.$store.getters.oltlist;
      oltlist = oltlist.filter(olt => olt.device.name == this.oltname);
      return oltlist;
    }
  },
  methods: {
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