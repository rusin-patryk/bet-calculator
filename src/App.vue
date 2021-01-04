<template>
  <v-app style="background-color: #efefef">
    <v-app-bar
      app
      color="#111111"
      dark
      height="70"
    >
      <div class="d-flex align-center">
        <h2>Bet Calculator <small>- spatryk.in</small></h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://patryk.in"
        target="_blank"
        text
      >
        <span class="mr-2">Home</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height pt-2 pb-2"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  export default {
    name: 'App',

    data: () => ({
      //
    })
  }
</script>
