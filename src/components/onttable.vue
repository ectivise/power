<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="ontheaders"
            :items="ontlist"
            :search="ontsearch"
            :expanded.sync="ontexpanded"
            single-expand
            item-key="_id"
            class="elevation-1"
          >
            <template v-slot:item="{item}">
              <tr @click="handlerow(item)" class="text-left">
                <td><v-chip :color="getColor(item.device.redundant)" dark class="caption" small>{{ item.device.redundant }}</v-chip> {{item.device.name}}</td>
                <td>{{item.OLTport}}</td>
                <td>{{item.optical.distance}}</td>
                <td>{{item.optical.rx}}</td>
                <td>{{item.optical.tx}}</td>
                <td><span class="text-uppercase">{{item.device.type}}</span></td>
                <td>{{item.device.power.power * 604800}}</td>
                <td>{{item.device.power.power * 2419200}}</td>
                <td>{{item.device.power.power * 31536000}}</td>
              </tr>
            </template>
            <!-- <template v-slot:item="{item}">
              <v-dialog v-model="dialog" presistent width="500">
                <v-card>
                  <v-card-title>{{item.device.name}}</v-card-title>
                  <v-card-text>test</v-card-text>
                  <v-card-actions><v-btn @click="dialog=false">Close</v-btn></v-card-actions>
                </v-card>
              </v-dialog>
            </template>-->
            <!-- <template v-slot:item.device.type="{item}">
              <span class="text-uppercase">{{item.device.type}}</span>
            </template>
            <template v-slot:item.port="{item}">{{getportont(item.device.name)}}</template>
            <template v-slot:item.device.redundant="{item}">
              <v-chip :color="getColor(item.device.redundant)" dark>{{ item.device.redundant }}</v-chip>
            </template>
            <template v-slot:expanded-item="{headers,item}">
              <td :colspan="headers.length">
                <v-container>
                  <v-row>
                    <v-col cols="6" md="4">
                      <p>
                        Optical RX: {{item.optical.rx}}
                        <br />
                        Optical TX: {{item.optical.tx}}
                        <br />
                        last Down Time: {{item.device.lastDownTime}}
                        <br />
                        last Up Time: {{item.device.lastUpTime}}
                        <br />
                        SN: {{item.device.SN}}
                        <br />
                        Model: {{item.device.model}}
                        <br />
                        <v-divider></v-divider>
                      </p>
                    </v-col>
                    <v-col cols="6" md="8">
                      <line-chart :data="chartdata" xtitle="Date" ytitle="Power(Kw)" :curve="false"></line-chart>
                    </v-col>
                  </v-row>
                </v-container>
              </td>
            </template>-->
            <!-- <template v-slot:item.week="{ item }">{{item.device.power.power * 604800}}</template>
            <template v-slot:item.month="{ item }">{{item.device.power.power * 2419200}}</template>
            <template v-slot:item.year="{ item }">{{item.device.power.power * 31536000}}</template>
            <template v-slot:item.cost="{ item }">{{item.device.power.power * 2419200 * 0.01}}</template>-->
            <!-- <template v-slot:item.actions="{ item }">
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>-->
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-bold">ONT/MDU Devices</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="ontsearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  clearable
                  outlined
                  dense
                  class="px-6 mx-6"
                ></v-text-field>
                <!-- <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-1" v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field readonly label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Building"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Storey"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="IP"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field label="Password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
                </v-dialog>-->
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" presistent width="700">
      <v-card>
        <v-card-title>{{this.viewitem.device.name}}</v-card-title>
        <v-card-text class="text-left">
          <h4>OLT Details</h4>
          <p>
            OLT Name: {{this.viewitem.OLTname}}<br>
            OLT Port: {{this.viewitem.OLTport}}<br>
          </p>
          <v-divider class="mb-3"></v-divider>
          <h4>Device Details</h4>
          <p>
            Last Down Time: {{this.viewitem.device.lastDownTime}}<br />
            Last Up Time: {{this.viewitem.device.lastUpTime}}<br />
            Last Down Cause: {{this.viewitem.device.lastdowncause}}<br />
            SN: {{this.viewitem.device.SN}}<br />
            Model: {{this.viewitem.device.model}}<br />
          </p>
            <v-divider class="mb-3"></v-divider>
          <h4>Device Health</h4>
          <p>
            Bandwidth: {{this.viewitem.device.health.bandwidth}}%<br />
            CPU: {{this.viewitem.device.health.cpu}}<br />
            HDD: {{this.viewitem.device.health.hdd}}<br />
            MEM: {{this.viewitem.device.health.mem}}<br />
            Temperature: {{this.viewitem.device.health.temperature}}°C<br />
          </p>
          <v-divider class="mb-3"></v-divider>
          <h4>Device Optical</h4>
          <p>
            Optical RX: {{this.viewitem.optical.rx}}<br />
            Optical TX: {{this.viewitem.optical.tx}}<br />
            Distance: {{this.viewitem.optical.distance}}m<br />
            <!-- Time Stamp: {{this.viewitem.optical.timestamp}}<br /> -->
          </p>
          <v-divider class="mb-3"></v-divider>
          <h4>Device Power</h4>
          <line-chart :data="chartdata" xtitle="Date" ytitle="Power(Kw)" :curve="false" class="mt-3"></line-chart><br>
          <p>
            Cost: $120<br>
          </p>
          
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog=false" color="primary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "onttable",
  data() {
    return {
      chartdata: {
        "15/6": 3,
        "16/6": 3,
        "17/6": 3.5,
        "18/6": 3
      },
      ontexpanded: [],
      // dialog: false,
      ontsearch: "",
      ontheaders: [
        {
          text: "Name",
          align: "start",
          value: "device.name"
        },
        { text: "OLT Port", value: "OLTport" },
        { text: "Distance", value: "distance" },
        { text: "Optical RX", value: "optical.rx",filterable: false, },
        { text: "Optical TX", value: "optical.tx",filterable: false, },
        { text: "Type", value: "device.type" },
        { text: "Today(kw)", value: "device.power.power",filterable: false, },
        { text: "Week(kw)", value: "week",filterable: false, },
        { text: "Month(kw)", value: "month",filterable: false, },
        // { text: "Action", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      dialog: false,
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ontlist() {
      return this.$store.getters.ontlist;
    },
    oltlist() {
      if (this.$store.getters.oltlist == undefined) {
        return [];
      } else {
        return this.$store.getters.oltlist;
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.get_ontlist();
  },

  methods: {
    get_ontlist() {
      this.$store.dispatch("get_ontlist");
    },

    handlerow(item) {
      this.viewitem = item;
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.raspberrypis.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.ontlist.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.ontlist.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.raspberrypis[this.editedIndex], this.editedItem);
      } else {
        this.raspberrypis.push(this.editedItem);
      }
      this.close();
    },

    getportont(ontname) {
      for (let i = 0; i < this.oltlist[0].ports.length; i++) {
        for (let j = 0; j < this.oltlist[0].ports[i].ONTs.length; j++) {
          if (this.oltlist[0].ports[i].ONTs[j] == ontname) {
            return this.oltlist[0].ports[i].portId;
          }
        }
      }
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
