<template>
  <div class="forgot-password">
    <div class="form-container">
      <v-card>
        <v-card-title class="text-center">Forgot Password</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="resetPassword">
            <v-text-field
              v-model="email"
              label="Email"
              required
              type="email"
              :error-messages="emailErrors"
            ></v-text-field>
            <v-alert
              v-if="error"
              type="error"
              dismissible
              transition="scale-transition"
            >{{ error }}</v-alert>
            <v-btn color="primary" type="submit">Reset Password</v-btn>
          </v-form>
          <div class="login-link">
            <router-link to="/">Back to Login</router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="animation-container">
      <!-- <lottie :options="animationOptions"></lottie> -->
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_mdyrjbcc.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
    </div>
    <v-dialog v-model="showAlert" max-width="500px">
      <v-card>
        <v-card-title class="text-center">Reset Email Sent</v-card-title>
        <v-card-text>
          <p>An email with instructions to reset your password has been sent to your email address.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="navigateToLogin">Go to Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      email: '',
    //   animationOptions: {
    //     path: 'path/to/lottie/animation.json', // Replace with your Lottie animation JSON file path
    //     loop: true,
    //     autoplay: true,
    //   },
    showAlert: false,
    error: '',
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.email) {
        errors.push('Email is required');
      } else if (!this.isValidEmail(this.email)) {
        errors.push('Invalid email format');
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
    resetPassword() {
      if (this.emailErrors.length === 0) {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            // Password reset email sent successfully
            console.log('Password reset email sent');
            this.showAlert = true;
          })
          .catch((error) => {
            // Error occurred while sending password reset email
            console.error(error);
            this.error = 'An error occurred. Please try again later.';
          });
      }
    },

    navigateToLogin() {
      this.$router.push('/'); // Replace '/login' with your login route path
    },
  },
};
</script>

<style scoped>
.forgot-password {
  /* background: linear-gradient(#6d6b7e, #59687d); */
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

@media (max-width: 768px) {
  .forgot-password {
    flex-direction: column;
  }

  .form-container,
  .animation-container {
    width: 100%;
  }
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
