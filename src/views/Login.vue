<template>
  <v-container>
      <v-row>
          <v-img src="../assets/ectiviselogo.jpeg" alt="image of ectivise logo" contain height="200px"></v-img>
      </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="6" sm="12" offset-lg="4" offset-md="3" offset-sm="0" offset="0">
        <v-form>
          <h1>Login</h1>
          <v-text-field
            label="Phone Number"
            v-model="logininfo.phonenumber"
            :rules="phonerules"
            required
            @focus="resetvalidation()"
          ></v-text-field>
          <!-- <v-text-field label="Password" v-model="logininfo.password" :rules="[v => !!v || 'item is required for Login']" required @focus="resetvalidation()" type="password"></v-text-field> -->
          <!-- <v-btn class="primary ma-3" @click="handlelogin()" :disabled="logindisabled">login</v-btn> -->

          <!-- login with OTP -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                class="ma-3"
                @click="handleloginotp()"
                :disabled="otpdisabled"
              >Login with OTP</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">One-Time-Password</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row justify="center">
                    <small class="subtitle-1">OTP have been sent to your Phonenumber via SMS</small>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field label="OTP" required v-model="logininfo.otp" :rules="otprules"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" sm="6" md="6" offset="3">
                      <v-btn text @click="handleloginotp()">Resend OTP</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="loginotp()">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "Login",
      logininfo: {
        phonenumber: "",
        password: "",
        otp: ""
      },
      dialog: false
    };
  },
  computed: {
    loginmessage() {
      return this.$store.getters.loginmessage;
    },
    phonerules() {
      const rules = [];

      const rule = v => !!v || "item is required";
      rules.push(rule);

      if (this.logininfo.phonenumber !== "") {
        const rule = v => /(^[0-9]+$)/.test(v) || "number only";
        rules.push(rule);
      }
      return rules;
    },
    otprules() {
      const rules = [];

      const rule = v => !!v || "item is required";
      rules.push(rule);

      if (this.logininfo.phonenumber !== "") {
        const rule1 = v => /(^[0-9]+$)/.test(v) || "number only";
        rules.push(rule1);

        const rule2 = v => v.length <= 6 || "Otp length is 6 digit code only";
        rules.push(rule2);
      }
      return rules;
    },
    otpdisabled() {
      if (
        this.logininfo.phonenumber !== "" &&
        /(^[0-9]+$)/.test(this.logininfo.phonenumber)
      ) {
        return false;
      }
      return true;
    },
    logindisabled() {
      if (
        this.logininfo.phonenumber !== "" &&
        /(^[0-9]+$)/.test(this.logininfo.phonenumber) &&
        this.logininfo.password !== ""
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async handlelogin() {
      await this.$store.dispatch("login", this.logininfo);
      if (this.$store.getters.loginerrorcode == 0) {
        this.$store.commit("login");
        let url = "/";
        this.$router.push(url);
        this.loginstatus();
      }
    },
    handleloginotp() {
      this.$store.dispatch("logingetotp", this.logininfo);
    },
    async loginotp() {
      await this.$store.dispatch("login2fa", this.logininfo);
      if (this.$store.getters.loginerrorcode == 0) {
        this.dialog = false;
        this.$store.commit("login");
        let url = "/";
        this.$router.push(url);
        this.loginstatus();
      }
    },
    resetvalidation() {
      this.valid = false;
    },
    handleforgetpw() {
      this.$store.commit("forgetpw", true);
      let url = "/register";
      this.$router.push(url);
    },
    loginstatus() {
      var obj = {
        login: this.$store.getters.login
      };
      sessionStorage.setItem("data", JSON.stringify(obj));
    }
  }
};
</script>
