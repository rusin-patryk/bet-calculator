<template>
  <v-app style="background-color: #efefef">
    <v-app-bar
      app
      color="#111111"
      dark
      height="70"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink"
          contain
          min-width="100"
          src="https://nanocoder.pl/wp-content/uploads/2020/06/Nanocoder-logo-white.svg"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://nanocoder.pl"
        target="_blank"
        text
      >
        <span class="mr-2">Home</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height pt-12 pb-12"
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
