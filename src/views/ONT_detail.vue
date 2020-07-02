<template>
  <v-card>
    <v-card-title>{{this.viewitem.device.name}}</v-card-title>
    <v-card-text class="text-left">
      <h4>OLT Details</h4>
      <p>
        OLT Name: {{this.viewitem.OLTname}}
        <br />
        OLT Port: {{this.viewitem.OLTport}}
        <br />
      </p>
      <v-divider class="mb-3"></v-divider>
      <h4>Device Details</h4>
      <p>
        Last Down Time: {{this.viewitem.device.lastDownTime}}
        <br />
        Last Up Time: {{this.viewitem.device.lastUpTime}}
        <br />
        Last Down Cause: {{this.viewitem.device.lastdowncause}}
        <br />
        SN: {{this.viewitem.device.SN}}
        <br />
        Model: {{this.viewitem.device.model}}
        <br />
      </p>
      <v-divider class="mb-3"></v-divider>
      <h4>Device Health</h4>
      <p>
        Bandwidth: {{this.viewitem.device.health.bandwidth}}%
        <br />
        CPU: {{this.viewitem.device.health.cpu}}
        <br />
        HDD: {{this.viewitem.device.health.hdd}}
        <br />
        MEM: {{this.viewitem.device.health.mem}}
        <br />
        Temperature: {{this.viewitem.device.health.temperature}}°C
        <br />
      </p>
      <v-divider class="mb-3"></v-divider>
      <h4>Device Optical</h4>
      <p>
        Optical RX: {{this.viewitem.optical.rx}}
        <br />
        Optical TX: {{this.viewitem.optical.tx}}
        <br />
        Distance: {{this.viewitem.optical.distance}}m
        <br />
        <!-- Time Stamp: {{this.viewitem.optical.timestamp}}<br /> -->
      </p>
      <v-divider class="mb-3"></v-divider>
      <v-container>
          <!-- <v-row>
              <v-col>
                <h3>Optical RX against Time</h3>
                <line-chart :data="rxdata" xtitle="Date" ytitle="Optical RX" :curve="false" class="mt-3"></line-chart>
              </v-col>
              <v-col>
                <h3>Optical TX against Time</h3>
                <line-chart :data="txdata" xtitle="Date" ytitle="Optical TX" :curve="false" class="mt-3" :colors="['#b00', '#666']"></line-chart>
              </v-col>
          </v-row> -->
          <v-row>
              <v-col>
                <h3>Optical RX Gausian</h3>
                    <line-chart :data="bellcurvedataRX" xtitle="Power" ytitle="Probability" class="mt-3"></line-chart>
              </v-col>
              <v-col>
                  <h3>Optical TX Gausian</h3>
                    <line-chart :data="bellcurvedataTX" xtitle="Power" ytitle="Probability" class="mt-3" :colors="['#b00', '#666']"></line-chart>
              </v-col>
          </v-row>
      </v-container>
    
      
      <p>
        Cost: $120
        <br />
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ont_detail",
  data() {
    return {
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
      },
      viewitem: {
        optical: {
          rx: 0,
          tx: 0,
          timestamp: 0
        },
        distance: 0,
        device: {
          health: {
            temperature: 0,
            cpu: 0,
            mem: 0,
            hdd: 0,
            bandwidth: 0
          },
          power: {
            power6h: "",
            power24h: "",
            power1w: "",
            power1m: "",
            power1y: "",
            power: 0,
            voltage: 0,
            current: 0
          },
          name: "",
          IP_Address: "",
          type: "",
          category: "",
          lastdowncause: "",
          redundant: "",
          lastDownTime: "",
          lastUpTime: "",
          SN: "",
          model: ""
        },
        OLTname: "",
        OLTport: "",
        subsystemPorts: [],
        __v: 0
      }
    };
  },
  computed:{
      bellcurvedataTX(){
      var ontopticdata = this.$store.getters.ont_opticdata;
      
      if (ontopticdata == undefined) {
        return {};
      } else {
    //     var dataset = [
    //     { 
    //       name: 'Optical TX',
    //       data:[]
    //     },
    //     { 
    //       name: 'Optical RX',
    //       data:[]
    //     },
    //   ]


        // TX
        var arrayTX = []
        var sumTX = 0
        var meanTX = 0
        var summationTX = 0
        var normalizeTX = []
        var labelsTX = []
        // mean
        for(let i=0; i<ontopticdata.length; i++){
          sumTX += ontopticdata[i].tx
        }
        meanTX = sumTX/ontopticdata.length
        // console.log(meanTX)
        // SD
        for(let i=0; i<ontopticdata.length; i++){
          summationTX += Math.pow((ontopticdata[i].tx - meanTX),2)
        }
        var SDTX = Math.sqrt(summationTX/ontopticdata.length)
        // console.log(SDTX)
        // labels
        for(let i=0; i<ontopticdata.length; i++){
            labelsTX.push(ontopticdata[i].tx)
        }
        labelsTX.sort(function(a, b){return a-b});
        // console.log(labelsTX)
        // normalize
        for(let i=0; i<labelsTX.length; i++){
          normalizeTX.push(this.gaussfunction(labelsTX[i],meanTX,SDTX))
        }
        
        // bellcurve data
        for(let i=0; i<labelsTX.length; i++){
          let point=[];
          point.push(labelsTX[i]);
          point.push(normalizeTX[i]);
          arrayTX.push(point)
        }
        // console.log(arrayTX)
        return arrayTX
        // dataset[0].data = arrayTX
      }

      },
    bellcurvedataRX(){
    var ontopticdata = this.$store.getters.ont_opticdata;
      
      if (ontopticdata == undefined) {
        return {};
      } else {
          // RX
        var arrayRX = []
        var sumRX = 0
        var meanRX = 0
        var summationRX = 0
        var normalizeRX = []
        var labelsRX = []
        // mean
        for(let i=0; i<ontopticdata.length; i++){
          sumRX += ontopticdata[i].rx
        }
        meanRX = sumRX/ontopticdata.length
        console.log(meanRX)
        // SD
        for(let i=0; i<ontopticdata.length; i++){
          summationRX += Math.pow((ontopticdata[i].rx - meanRX),2)
        }
        var SDRX = Math.sqrt(summationRX/ontopticdata.length)
        console.log(SDRX)
        // labels
        for(let i=0; i<ontopticdata.length; i++){
            labelsRX.push(ontopticdata[i].rx)
        }
        labelsRX.sort(function(a, b){return a-b});
        console.log(labelsRX)

        // normalize
        for(let i=0; i<labelsRX.length; i++){
          normalizeRX.push(this.gaussfunction(labelsRX[i],meanRX,SDRX))
        }

        console.log(normalizeRX)
        // bellcurve data
        for(let i=0; i<labelsRX.length; i++){
          let point=[];
          point.push(labelsRX[i]);
          point.push(normalizeRX[i]);
          arrayRX.push(point)
        }
        // console.log(arrayRX)
        // dataset[1].data = arrayRX

        return arrayRX
      }
    },
  },
  created() {
    this.getontdetail(this.$route.params.ont_name);
  },
  methods: {
    getontdetail(ontname) {
      this.viewitem = this.$store.getters.ont(ontname);
    },
    gaussfunction(x, m, sd) {
      var prob = 0;
      prob =
        (1 / (sd * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(x - m, 2) / (2 * Math.pow(sd, 2)));
      return prob;
    }
  }
}
</script>
