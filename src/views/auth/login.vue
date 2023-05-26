<template>
  <div class="login-page">
    <div class="form-container">
      <v-card>
        <v-card-title class="text-center">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              required
              type="email"
              :error-messages="emailErrors"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
              type="password"
              :error-messages="passwordErrors"
            ></v-text-field>
            <v-alert
              v-if="error"
              type="error"
              dismissible
              transition="scale-transition"
              >{{ error }}</v-alert
            >
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-form>
          <div class="forgot-password-link">
            <router-link to="/forgotpassword">Forgot Password?</router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="animation-container">
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_mdyrjbcc.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
    </div>
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
      email: "",
      password: "",

      error: "",
      snackbarMessage: "",
      snackbarTimeout: 3000,
      snackbarColor: "success",
      showSnackbar: false,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.email) {
        errors.push("Email is required");
      } else if (!this.isValidEmail(this.email)) {
        errors.push("Invalid email format");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.password) {
        errors.push("Password is required");
      }
      return errors;
    },
  },
  methods: {
    isValidEmail(email) {
      // Add your email validation logic here
      // This is a basic example, you may want to use a more robust email validation library
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async login() {
      if (this.emailErrors.length === 0 && this.passwordErrors.length === 0) {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // Successful login
            console.log("Login successful");
            this.showSnackbar = true;
            this.snackbarColor = "success";
            this.snackbarMessage = "Login successful";

            setTimeout(() => {
              // Code to execute after the timeout
              console.log("Timeout completed after 2 seconds");
              // Add your desired logic here
            

            const user = firebase.auth().currentUser;
            if (user) {
              console.log("User ID:", user.uid);
            }
            if (user.uid == "bp3uSkHP7aTkDlRodzkBJoa3AX33") {
              this.$router.push("/admin");
            } else {
              this.$router.push("/faculty");
            }
            // Reset form fields
            this.email = "";
            this.password = "";
            }, 1000);
          })
          .catch((error) => {
            // Error occurred during login
            console.error(error);
            this.error = "Invalid email or password";
            this.showSnackbar = false;
            this.snackbarColor = "error";
            this.snackbarMessage = "Invalid email or password";
          });
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 50%;
  padding: 2rem;
}

.animation-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-link {
  text-align: center;
  margin-top: 1rem;
}

.forgot-password-link a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
