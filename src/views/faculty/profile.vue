<template>
  <div class="profile-page">
    <h2>Profile</h2>
    <v-form @submit.prevent="updateProfile">
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="designation" label="Designation"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="mobile" label="Mobile"></v-text-field>
      <v-text-field
        v-model="dob"
        label="Date of Birth"
        type="date"
      ></v-text-field>
      <v-text-field
        v-model="doj"
        label="Date of Join"
        type="date"
      ></v-text-field>
      <v-text-field v-model="gender" label="Gender"></v-text-field>
      <v-text-field
        v-model="qualification"
        label="Qualification"
      ></v-text-field>
      <v-btn color="primary" type="submit">Update Profile</v-btn>
    </v-form>
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
import { facultyService } from "../../service";

export default {
    name: 'profile',
  data() {
    return {
      id: "f1",
      name: "John Doe",
      designation: "Professor",
      email: "johndoe@example.com",
      mobile: "1234567890",
      password: "password123",
      dob: "1990-01-01",
      doj: "2010-05-15",
      gender: "Male",
      qualification: "Ph.D.",
      currentPassword: "",
      newPassword: "",
      snackbarMessage: "",
      snackbarTimeout: 3000,
      snackbarColor: "success",
      showSnackbar: false,
    };
  },
  created(){
    this.init()
  },
  methods: {
    async init(){
        var res= await facultyService.getUserById();
        this.id= res.id
      this.name= res.name
      this.designation= res.designation
      this.email= res.email
      this.mobile= res.mobile
    //   this.password= 
      this.dob= res.dob
      this.doj= res.doj
      this.gender= res.gender
      this.qualification= res.qualification
    },
    async updateProfile() {
      // Perform the update to the database here
      // You can use an API call or any other method to update the user details

      // For demonstration purposes, we'll just log the updated details
      console.log("Updated profile:");
      console.log({
        id: this.id,
        name: this.name,
        designation: this.designation,
        email: this.email,
        mobile: this.mobile,
        dob: this.dob,
        doj: this.doj,
        gender: this.gender,
        qualification: this.qualification,
      });

      var details = {
        id: this.id,
        name: this.name,
        designation: this.designation,
        email: this.email,
        mobile: this.mobile,
        dob: this.dob,
        doj: this.doj,
        gender: this.gender,
        qualification: this.qualification,
      }

      await facultyService.updateFacultyProfile(details)

      this.showSnackbar = true;
      this.snackbarColor = "success";
      this.snackbarMessage = "Profile updated successfully";
    },
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
.profile-page {
  max-width: 400px;
  margin: auto;
}

.v-form {
  margin-bottom: 1rem;
}
</style>
