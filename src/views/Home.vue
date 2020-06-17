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
        <v-data-iterator hide-default-footer :items="top5">
        <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="green darken-5"
          dark
          flat
        >
          <v-toolbar-title>Top 5 Power ONTs Devices</v-toolbar-title>
        </v-toolbar>
      </template>

      </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      todaylabels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      weeklabels: ["15/6", "16/6", "17/6", "18/6", "19/6", "20/6", "21/6"],
      monthlabels: ["1/6", "8/6", "15/6", "22/6", "29/6"],
      yearlabels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
      todayvalue: [200, 675, 410, 390, 310, 460, 250, 240],
      weekvalue: [200, 675, 410, 390, 310, 460, 250],
      monthvalue: [200, 675, 410, 390, 310],
      yearvalue: [200, 675, 410, 390, 310, 460],
      gradient:['#f72047', '#ffd200', '#1feaea'],
      gradientDirection: 'top',
    }
  },
  components: {},
}
</script>
