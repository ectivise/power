<template>
  <v-container>
      <v-card>
          <v-card-title><h1>{{oltname}}</h1></v-card-title>
        <v-card-text> 

        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            oltname: this.$route.params.olt_name,
        }
    },
    computed:{
        olt(){
            var oltlist = this.$store.getters.oltlist
            oltlist = oltlist.filter(olt => olt.device.name == this.oltname)
            return oltlist
        },
    }
}
</script>

<style>

</style>