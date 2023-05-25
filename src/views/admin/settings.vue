<template>
  <div class="settings-page">
    <h2>Admin Settings</h2>
    <v-form @submit.prevent="updatePassword">
      <v-text-field
        v-model="currentPassword"
        label="Current Password"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="newPassword"
        label="New Password"
        type="password"
      ></v-text-field>
      <v-btn color="primary" type="submit">Update Password</v-btn>
    </v-form>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      top
      right
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      snackbarMessage: "",
      snackbarTimeout: 3000,
      snackbarColor: "success",
      showSnackbar: false,
    };
  },
  methods: {
    updatePassword() {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          return user.updatePassword(this.newPassword);
        })
        .then(() => {
          console.log("Password updated successfully");
          this.showSnackbar = true;
          this.snackbarColor = "success";
          this.snackbarMessage = "Password updated successfully";
          this.currentPassword = "";
          this.newPassword = "";
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          this.showSnackbar = true;
          this.snackbarColor = "error";
          this.snackbarMessage = "Error updating password";
        });
    },
  },
};
</script>

<style scoped>
.settings-page {
  max-width: 400px;
  margin: auto;
}

.v-form {
  margin-bottom: 1rem;
}
</style>
