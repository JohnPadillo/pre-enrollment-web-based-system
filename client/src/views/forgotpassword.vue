<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form ref="form" v-show="!isValidUser">
          <div class="white elevation-2" style="height: 500px">
            <v-toolbar class="blue darken-4" dark>
              <v-toolbar-title>Forgot Password</v-toolbar-title>
            </v-toolbar>
            <div class="pl-4 pr-4 pt-4">
              <v-text-field
                label="Email"
                v-model="email"
                outlined
                :rules="[rules.required]"
                class="pt-8"
              ></v-text-field>
              <v-text-field
                label="Contact No"
                v-model="contact_no"
                outlined
                type="number"
                :rules="[rules.required, rules.number]"
              ></v-text-field>
            </div>
            <div class="pl-4 pr-4 pb-4 pt-12">
              <v-btn
                block
                color="blue darken-4"
                dark
                height="50"
                @click="submit()"
                >Submit</v-btn
              >
            </div>
          </div>
          <snackbar
            ref="snackbar"
            :color="snackbarColor"
            :text="snackbarText"
            @close="closeSnackBar()"
          />
        </v-form>
        <v-form ref="form" v-show="isValidUser">
          <div class="white elevation-2" style="height: 500px">
            <v-toolbar class="blue darken-4" dark>
              <v-toolbar-title>Change Password</v-toolbar-title>
            </v-toolbar>
            <div class="pl-4 pr-4 pt-4">
              <v-text-field
                label="New Password"
                v-model="new_password"
                outlined
                type="password"
                :rules="[rules.required]"
                class="pt-8"
              ></v-text-field>
              <v-text-field
                type="password"
                label="Confirm Password"
                v-model="confirm_password"
                outlined
                :rules="[rules.required, rules.number]"
              ></v-text-field>
            </div>
            <div class="pl-4 pr-4 pb-4 pt-12">
              <v-btn
                block
                color="blue darken-4"
                dark
                height="50"
                @click="changePassword()"
                >Submit</v-btn
              >
            </div>
          </div>
          <snackbar
            ref="snackbar"
            :color="snackbarColor"
            :text="snackbarText"
            @close="closeSnackBar()"
          />
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginService from "@/services/Login";
import StudentService from "@/services/StudentService";
export default {
  data() {
    return {
      isValidUser: false,
      title: "Submit",
      email: "",
      contact_no: "",
      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "Email must be valid",
        number: v => v.length <= 11 || "Maximum of 11 Digits"
      },
      snackbarColor: "",
      snackbarText: "",
      confirm_password: "",
      new_password: "",
      user: null
    };
  },
  // mounted() {
  //   this.$store.dispatch("unSetUser");
  // },

  methods: {
    async changePassword() {
      if (this.new_password === this.confirm_password) {
        const data = {
          id: this.user.id,
          first_name: this.user.first_name,
          middle_name: this.user.middle_name,
          last_name: this.user.last_name,
          email: this.user.email,
          permanent_address: this.user.permanent_address,
          password: this.confirm_password,
          contact_no: this.user.contact_no,
          name_of_guardian: this.user.name_of_guardian,
          contact_no_of_guardian: this.user.contact_no_of_guardian,
          course: this.user.course.id,
          section: this.user.section.id,
          type: this.user.type,
          departmentId: this.user.department.id
        };

        await StudentService.editStudent(data);
        this.snackbarColor = "success";
        this.snackbarText = "Password successfully changed!";
        this.$refs.snackbar.dialog = true;
        this.$router.push({ path: "/" });
      } else {
        this.snackbarColor = "error";
        this.snackbarText = "Password did not match!";
        this.$refs.snackbar.dialog = true;
      }
    },
    async submit() {
      try {
        let data = {
          email: this.email
        };
        this.user = (await LoginService.login(data)).data;
        if (this.user) {
          // validate contact no
          if (this.contact_no === this.user.contact_no) {
            this.isValidUser = true;
          } else {
            this.snackbarColor = "error";
            this.snackbarText = "Incorrect Email and Contact_no!";
            this.$refs.snackbar.dialog = true;
          }
        }
      } catch (error) {
        this.snackbarColor = "error";
        this.snackbarText = "Incorrect Email and Contact No!";
        this.$refs.snackbar.dialog = true;
      }

      // if (user) {
      //   if (checkNumber(user.contact_no)) {
      //     await this.$store.dispatch("setUser", user);

      //     if (user.status === 0) {
      //       this.$router.push({ path: "/dashboard" });
      //     } else {
      //       console.log(user);
      //       this.$router.push({ path: "/admin" });
      //     }
      //   }
      // }
    }
  },

  reset() {
    (this.email = ""), (this.contact_no = "");
  },

  closeSnackBar() {
    this.$refs.snackbar.dialog = false;
  }
};
</script>

<style></style>
