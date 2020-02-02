<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            Schedules
            <v-spacer></v-spacer>
            <!-- <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              clearable
            ></v-text-field>-->
            <addButton :title="title" @add="add" />
            <!-- <v-menu
              ref="menu"
              v-model="timePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn id="button" @click="openTimePicker" v-on="on">
                  {{
                  time ? title : "Time"
                  }}
                </v-btn>
              </template>
              <v-time-picker v-if="timePicker" v-model="time" scrollable></v-time-picker>
            </v-menu>-->
          </v-card-title>
          <scheduleForm
            ref="scheduleForm"
            :dialog="openScheduleDialog"
            @close="closeScheduleDialog"
          ></scheduleForm>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ScheduleForm from "@/components/form/ScheduleForm";
export default {
  watch: {
    time(val) {
      console.log(val);
    }
  },
  components: {
    ScheduleForm
  },
  data() {
    return {
      title: "Schedule",
      time: "",
      timePicker: false,
      openScheduleDialog: false
    };
  },
  methods: {
    openTimePicker() {
      this.timePicker = true;
    },
    add() {
      this.openScheduleDialog = true;
    },
    closeScheduleDialog() {
      this.openScheduleDialog = false;
    }
  }
};
</script>

<style></style>
