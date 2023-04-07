<template>
  <v-app>
    <v-main class="pa-4">
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
  font-family: sans-serif;
  background: linear-gradient(#3b2abd, #15181c);
}
</style>