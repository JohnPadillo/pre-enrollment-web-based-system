<template>
  <v-btn large dark color="green" @click="add">
            <v-icon left>add_circle_outline</v-icon> Add {{ title.substr(0, title.length - 1) }}
        </v-btn>
</template>

<script>
export default {
    props: [
        'title'
    ],
    methods: {
        add() {
            this.$emit('add')
        }
    }
}
</script>

<style>

</style>