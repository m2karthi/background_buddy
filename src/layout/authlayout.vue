<template>
  <v-app>
    <v-main class="ma-0 pa-0">
      <!-- <div>Login</div> -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
    
    <script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "authLayout",
  components: {},
};
</script>
    
<style scoped>
html {
  height: 100%;
}
.v-main {
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: sans-serif;
  /* background: linear-gradient(#6d6b7e, #59687d); */
    background: radial-gradient(#653d84, #332042);

}
</style>