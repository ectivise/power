<template>
  <v-card>
    <v-data-table
      :headers="oltheaders"
      :items="oltlist"
      :search="oltsearch"
      :expanded.sync="oltexpanded"
      single-expand
      item-key="device.name"
      class="elevation-1"
      show-expand
    >
      <template v-slot:expanded-item="{headers,item}">
        <td :colspan="headers.length">
          Optical RX:  {{ item.optical.rx }}<br>
          Optical TX:  {{ item.optical.tx }}<br>
        </td>
      </template>
      <template v-slot:item.cost="{ item }">
        {{item.device.power.power * 0.01}}
      </template>
      <template v-slot:item.device.redundant="{ item }">
      <v-chip :color="getColor(item.device.redundant)" dark>{{ item.device.redundant }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-bold">OLT Devices</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="oltsearch"
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
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      oltexpanded: [],
      dialog: false,
      oltsearch: "",
      oltheaders: [
        {
          text: "Device",
          align: "start",
          value: "device.name"
        },
        { text: "Status", value: "device.redundant" },
        { text: "Today(kw)", value: "device.power.power" },
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
    oltlist() {
      return this.$store.getters.oltlist;
    },
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
      const index = this.raspberrypis.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.raspberrypis.splice(index, 1);
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