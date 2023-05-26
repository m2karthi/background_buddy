<template>
  <div class="login-page">
    <section class="login">
		<div class="login_box">
			<div class="left">
<!-- 				<div class="top_link"><a href="#"><img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt="">Return home</a></div> -->
				<div class="contact">
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
               <div class="forgot-password-link mt-2">
            <router-link to="/forgotpassword">Forgot Password?</router-link>
          </div>
          </v-form>
       
				</div>
			</div>
			<div class="right">
				<div class="right-text">
					<h2>Amrita</h2>
					<h5>Exam Alteration Helper</h5>
				</div>
				<div class="right-inductor"><img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt=""></div>
			</div>
		</div>
	</section>
  </div>
  <!-- <div class="login-page">
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
  </div> -->
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

/* .forgot-password-link {
  text-align: center;
  margin-top: 1rem;
} */

.forgot-password-link a {
  color: grey;
  text-decoration: underline;
  cursor: pointer;
}

img{
	width: 100%;
}
.login {
    height: 1000px;
    width: 100%;
    /* background: radial-gradient(#653d84, #332042); */
    /* position: relative; */
}
.login_box {
    width: 1050px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 4px 22px -8px #0004;
    display: flex;
    overflow: hidden;
}
.login_box .left{
  width: 41%;
  height: 100%;
  padding: 25px 25px;
  
}
.login_box .right{
  width: 59%;
  height: 100%  
}
.left .top_link a {
    color: #452A5A;
    font-weight: 400;
}
.left .top_link{
  height: 20px
}
.left .contact{
	display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 100%;
    width: 73%;
    margin: auto;
}
.left h3{
  text-align: center;
  margin-bottom: 40px;
}
.left input {
    border: none;
    width: 80%;
    margin: 15px 0px;
    border-bottom: 1px solid #4f30677d;
    padding: 7px 9px;
    width: 100%;
    overflow: hidden;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
}
.left{
	background: linear-gradient(-45deg, #dcd7e0, #fff);
}
.submit {
    border: none;
    padding: 15px 70px;
    border-radius: 8px;
    display: block;
    margin: auto;
    margin-top: 120px;
    background: #583672;
    color: #fff;
    font-weight: bold;
    -webkit-box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
    -moz-box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
    box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
}



.right {
	background: linear-gradient(212.38deg, rgba(242, 57, 127, 0.7) 0%, rgba(175, 70, 189, 0.71) 100%),url(https://static.seattletimes.com/wp-content/uploads/2019/01/web-typing-ergonomics-1020x680.jpg);
	color: #fff;
	position: relative;
}

.right .right-text{
  height: 100%;
  position: relative;
  transform: translate(0%, 45%);
}
.right-text h2{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
}
.right-text h5{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
}

.right .right-inductor{
  position: absolute;
  width: 70px;
  height: 7px;
  background: #fff0;
  left: 50%;
  bottom: 70px;
  transform: translate(-50%, 0%);
}
.top_link img {
    width: 28px;
    padding-right: 7px;
    margin-top: -3px;
}




</style>
