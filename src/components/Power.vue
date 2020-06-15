<template>
  <v-container>
    
    <v-row>
      <!-- today -->
      <v-col>
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="light-blue"
            elevation="12"
            max-width="calc(100% - 10px)"
          >
            <v-sparkline :labels="todaylabels" :value="todayvalue" color="white" line-width="2" padding="16" label-size="12"></v-sparkline>
          </v-sheet>
          <v-card-title>Today</v-card-title>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2 grey--text" >Accumulated Power, 15-6-2020 12am</div>
            <div class="display-1 font-weight-light grey--text">20kw</div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- week -->
      <v-col>
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 10px)"
          >
            <v-sparkline :labels="weeklabels" :value="weekvalue" color="white" line-width="2" padding="16" label-size="12"></v-sparkline>
          </v-sheet>
          <v-card-title>Week</v-card-title>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Accumulated Power, 15-6-2020</div>
            <div class="display-1 font-weight-light grey--text">40kw</div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- month -->
      <v-col>
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="green"
            elevation="12"
            max-width="calc(100% - 10px)"
          >
            <v-sparkline :labels="monthlabels" :value="monthvalue" color="white" line-width="2" padding="16" label-size="12"></v-sparkline>
          </v-sheet>
          <v-card-title>Month</v-card-title>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Accumulated Power, June 2020</div>
            <div class="display-1 font-weight-light grey--text">80kw</div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- year -->
      <v-col>
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="teal"
            elevation="12"
            max-width="calc(100% - 10px)"
          >
            <v-sparkline :labels="yearlabels" :value="yearvalue" color="white" line-width="2" padding="16" label-size="12"></v-sparkline>
          </v-sheet>
          <v-card-title>Year</v-card-title>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Accumulated Power, Year 2020</div>
            <div class="display-1 font-weight-light grey--text">160kw</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="devices"
            :search="search"
            :expanded.sync="expanded"
            single-expand
            item-key="name"
            class="elevation-1"
            show-expand
          >
            <template v-slot:expanded-item="{headers,item}">
              <td :colspan="headers.length">More info about {{ item.name }} <v-sparkline :labels="todaylabels" :value="todayvalue" color="red" line-width="2" padding="16"></v-sparkline></td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-bold display-1">All Devices</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
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
                            <v-text-field v-model="editedItem.name" readonly label="Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.location.building" label="Building"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.location.level" label="Storey"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.ip" label="IP"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Power",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dialog: false,
      search: "",
      todaylabels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      weeklabels: ["15/6", "16/6", "17/6", "18/6", "19/6", "20/6", "21/6"],
      monthlabels: ["1/6", "8/6", "15/6", "22/6", "29/6"],
      yearlabels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
      todayvalue: [200, 675, 410, 390, 310, 460, 250, 240],
      weekvalue: [200, 675, 410, 390, 310, 460, 250],
      monthvalue: [200, 675, 410, 390, 310],
      yearvalue: [200, 675, 410, 390, 310, 460],
      headers: [
        {
          text: "Device",
          align: "start",
          value: "name"
        },
        { text: "Today(kw)", value: "today" },
        { text: "Week(kw)", value: "week" },
        { text: "Month(kw)", value: "month" },
        { text: "Year(kw)", value: "year" },
        { text: "Cost($)", value: "cost" },
        { text: "Action", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      devices: [
        {
          name: "1",
          today: 10,
          week: 71,
          month: 250,
          year: 300,
          cost: 50
        },
        {
          name: "2",
          today: 1,
          week: 7,
          month: 25,
          year: 300,
          cost: 50
        },
        {
          name: "3",
          today: 12,
          week: 234,
          month: 346,
          year: 300,
          cost: 50
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        location: {
          site: "Le Grove",
          building: "",
          level: ""
        },
        ip: "",
        status: 0,
        runtime: 0,
        user: "admin",
        password: "admin@espl_1234",
        APs: "APlist"
      },

      defaultItem: {
        name: "",
        location: {
          site: "Le Grove",
          building: "",
          level: ""
        },
        ip: "",
        status: 0,
        runtime: 0,
        user: "admin",
        password: "admin@espl_1234",
        APs: "APlist"
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.raspberrypis = this.$store.state.raspberrypis;
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
        case 0:
          return "green";
        case 1:
          return "orange";
        case 2:
          return "red";
      }
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -10px;
  position: relative;
}
</style>
