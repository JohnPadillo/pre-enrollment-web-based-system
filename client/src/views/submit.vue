<template>
  <v-container>
      <v-layout>

    
        <v-flex>
            
             <!-- <h1>Forgot Password</h1> -->

             <registerForm :title="title" @register="Submit">
               
            <v-layout>Please enter your current password</v-layout>
             <v-text-field label= "Current Password" v-model="CurrentPassword" outlined></v-text-field>
             

            <v-layout1>Please enter your New Password</v-layout1>
    
             <v-text-field label= "New Password" v-model="Newpassword" outlined></v-text-field>
            
                  
            </registerForm>
          </v-flex>
          
      </v-layout>
  </v-container>
</template>