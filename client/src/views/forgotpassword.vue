<template>
  <v-container>
      <v-layout>
        <v-flex>
            
             <!-- <h1>Forgot Password</h1> -->
              <div style="margin: auto; display: flex; align-items: center; height: 100%">
               <v-row justify= "left" align="left" class="pa-5">
                <v-col cols="4" align="left" style="margin-top: 2px">

             <registerForm :title="title" @register="Submit">
               
            <v-layout>Please enter your Email to change password</v-layout>
             <v-text-field label= "Email" v-model="email" outlined
             :rules="[rules.required]">
             ></v-text-field>
             
            <v-layout1>Please enter your Contact_no</v-layout1>
             <v-text-field label= "Contact_no" type="number" v-model="contact_no" outlined
                counter="11"
                maxlength="11"
                :rules="[rules.required, rules.number]"
             ></v-text-field>
             
          
            </registerForm>
            </v-col>
            </v-row>
            </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
import LoginService from "@/services/Login";
export default {
  components: {
    RegisterForm
     
  },
  data() {
    return {
      title: "Submit",
      email: "",
      contact_no: "",
       rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "Email must be valid",
        number: v =>v.length <= 11 || "Maximum of 11 Digits",
       },
      snackbarColor: "",
      snackbarText: ""
    };
  },
    mounted() {
    this.$store.dispatch("unSetUser");
  },

   methods: {
    async Submit() {
      try {
        let data = {
          email: this.email
        };
        let user = (await LoginService.login(data)).data;
        console.log(user);
        
        let checkNumber = contact_no => {
          return contact_no === this.contact_no;
        };
        if (user) {
          if (checkNumber(user.contact_no)){
            await this.$store.dispatch("setUser", user);

            if (user.status === 0) {
              this.$router.push({ path: "/dashboard" });
            } else {
              console.log(user);
              this.$router.push({ path: "/admin" });
            }
          }
        }
      } catch (error) {
        this.snackbarColor = "error";
        this.snackbarText = "Incorrect Email and Contact_no!";
        this.$refs.snackbar.dialog = true;
      }
    },

    reset() {
      (this.email = ""), (this.contact_no = "");
    },

    closeSnackBar() {
      this.$refs.snackbar.dialog = false;
    }
  }
};
</script>

<style></style>
