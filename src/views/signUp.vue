<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Sign In</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signin">
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn color="primary" type="submit" block>Sign In</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Sign in successful
          // You can redirect the user to another page or perform additional actions here
        })
        .catch((error) => {
          // Handle signin errors
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
