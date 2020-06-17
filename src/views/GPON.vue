<template>
  <v-containter>
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
  components:{
    oltcard,
    onttable,
  }
}
</script>