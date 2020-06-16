<template>
  <v-card>
    <v-data-table
      :headers="ontheaders"
      :items="ontlist"
      :search="ontsearch"
      :expanded.sync="ontexpanded"
      single-expand
      item-key="_id"
      class="elevation-1"
      show-expand
    >
      <template v-slot:expanded-item="{headers,item}">
        <td :colspan="headers.length">
          <v-container>
            <v-row>
              <v-col cols="6" md="4">
                <p>
                  Optical RX: {{item.optical.rx}}<br />
                  Optical TX: {{item.optical.tx}}<br />
                  last Down Time: {{item.device.lastDownTime}}<br />
                  last Up Time: {{item.device.lastUpTime}}<br />
                  SN: {{item.device.SN}}<br />
                  Model: {{item.device.model}}<br />
                  <v-divider></v-divider>
                </p>
                
              </v-col>
              <v-col cols="6" md="8">
                  <line-chart :data="chartdata"></line-chart>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>
      <template v-slot:item.week="{ item }">{{item.device.power.power * 604800}}</template>
      <template v-slot:item.month="{ item }">{{item.device.power.power * 2419200}}</template>
      <template v-slot:item.year="{ item }">{{item.device.power.power * 31536000}}</template>
      <template v-slot:item.cost="{ item }">{{item.device.power.power * 2419200 * 0.01}}</template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-bold">ONT Devices</v-toolbar-title>
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
          <v-dialog v-model="dialog" max-width="500px">
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
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      chartdata:{
        '15/6' : 3,
        '16/6' : 3,
        '17/6' : 3.5,
        '18/6' : 3,
      },
      ontexpanded: [],
      dialog: false,
      ontsearch: "",
      ontheaders: [
        {
          text: "Device",
          align: "start",
          value: "device.name"
        },
        { text: "Today(kw)", value: "device.power.power" },
        { text: "Week(kw)", value: "week" },
        { text: "Month(kw)", value: "month" },
        { text: "Year(kw)", value: "year" },
        { text: "Cost($)", value: "cost" },
        { text: "Action", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ontlist() {
      return this.$store.getters.ontlist;
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
    }
  }
};
</script>

<style>
</style>
