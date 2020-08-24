<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="100%">
          <v-card-title class="justify-center">
            Financial
          </v-card-title>
          <v-card-text>
            <v-list class="text-uppercase">
              <div class="fees" v-for="item in items" :key="item.name">
                <strong>{{ item.name }} </strong>
                <span
                  >Php {{ item.amount ? item.amount.toFixed(2) : "0.00" }}</span
                >
              </div>
              <div class="total">
                <strong>Total Assessment:</strong>
                <span
                  >Php
                  {{
                    totalAmount ? parseInt(totalAmount).toFixed(2) : "0.00"
                  }}</span
                >
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    items: Array
  },
  computed: {
    totalAmount() {
      return this.items.reduce((total, item) => {
        return (total += Number(item.amount));
      }, 0);
      // if (this.items.length) {
      //   return this.items.reduce((total, item) => {
      //     return (total += Number(item.amount));
      //   }, 0);
      // }
      // console.log(this.items);
      // if (this.items.length) {
      //   return this.items;
      // }
    }
  }
};
</script>

<style>
.fees {
  display: flex;
  justify-content: space-between;
  margin-inline-start: 5%;
  margin-inline-end: 5%;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-inline-start: 5%;
  margin-inline-end: 5%;
  border-top: 2px solid black;
  font-size: 1rem;
  font-weight: bold;
}
</style>
