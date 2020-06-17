<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <olttable />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <port_ont_table/>
      </v-col>
      <v-col>
        <port_mdu_table/>
      </v-col>
      <v-col>
        <port_onu_table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import olttable from "../components/olttable.vue";
import port_ont_table from "../components/port_ont_table.vue";
import port_mdu_table from "../components/port_mdu_table.vue";
import port_onu_table from "../components/port_onu_table.vue";

export default {
  components: {
    olttable,
    port_ont_table,
    port_mdu_table,
    port_onu_table,
  },
  created() {
    this.get_ontlist();
  },
  methods: {
    get_ontlist() {
      this.$store.dispatch("get_oltlist");
    }
  }
};
</script>

<style>
</style>