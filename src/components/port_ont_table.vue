<template>
  <div>
    <v-card>
    <v-data-table
      :headers="headers"
      :items="oltportlist"
      :search="search"
      :expanded.sync="expanded"
      single-expand
      item-key="portId"
      class="elevation-1"
      show-expand
      :loading="loading"
    >
      <template v-slot:item.status="{ item }">
        <v-chip color="red" dark v-if="item.ONTs.length == 0">no ONT</v-chip>
        <v-chip color="green" dark v-else>{{item.ONTs.length}} ONTs</v-chip>
      </template>
      <template v-slot:expanded-item="{headers,item}">
        <td :colspan="headers.length">
          <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(ont, index) in item.ONTs" :key="index">
                    <td>{{ ont }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-bold">ONTs</v-toolbar-title>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      dialog: false,
      search: "",
      headers: [
        {
          text: "Port",
          align: "start",
          value: "portId"
        },
        { text: "", value: "status", sortable: false },
        { text: "Action", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      loading:true,
    };
  },
  computed: {
      formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
      oltportlist() {
          if(this.$store.getters.oltlist == undefined){
              return [];
          }else{
              return this.$store.getters.oltlist[0].ports;
          }
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    oltportlist(value){
        if(value == undefined){
            this.loading = true;
        }else{
            this.loading = false;
        }
    }
  },
  methods: {
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
  }
};
</script>

<style>

</style>