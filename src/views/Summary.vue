<template>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <v-img alt="image of gpon model" src="http://dev1.ectivisecloud.com:8081/images/gponmodel.png" width="500px"></v-img>
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
  </v-container>
</template>

<script>
import oltcard from "../components/oltcard.vue";
import onttable from "../components/onttable.vue";

export default {
  name:"gpon",
  components:{
    oltcard,
    onttable,
  },
}
</script>

<style>

</style>