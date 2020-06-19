<template>
  <v-containter fluid>
    <v-row>
      <v-col align="center">
        <v-img alt="image of gpon model" src="../assets/gponmodel.jpeg" contain width="500px"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <oltcard/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <onttable/>
      </v-col>
    </v-row>
  </v-containter>
</template>

<script>
import oltcard from "../components/oltcard.vue";
import onttable from "../components/onttable.vue";

export default {
  name:"gpon",
  components:{
    oltcard,
    onttable,
  }
}
</script>

<style  scoped>


</style>