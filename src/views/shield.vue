<template>
  <div class="bgCheker">
    <div class="cont">
      <h2 class="mb-3">Wants an Shield against the False info</h2>
      <v-card width="550px" class="   ">
        <v-form @submit.prevent="sendData">
          <v-text-field
            v-model="username"
            label="UserName"
            solo
            clearable
            required
          ></v-text-field>
          <v-text-field
            v-model="repo"
            solo
            label="GitHub repo name"
            required
            clearable
          ></v-text-field>
          <v-autocomplete
            chips
            :items="items"
            clearable
            deletable-chips
            multiple
            small-chips
            v-model="skills"
            solo
            lable="Select Skills"
            required
          ></v-autocomplete>
          <!-- <v-text-field
                v-model="projets"
                solo
                label="Your Projects"
                required
                clearable -->
          <!-- </v-text-field> -->
          <v-btn color="warning" dark type="submit"> Verify Background </v-btn>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "shield",
  data() {
    return {
      skills: null,
      email: "",
      repo: "",
      items: [
        "C++",
        "Java",
        "Javascript",
        "Python",
        "DBMS",
        "Solidity",
        "Rust",
      ],
      projets: null,
      username: null,
    };
  },
  methods: {
    sendData() {
      var data = {
        username: this.username,
        repo: this.repo,
        skills: this.skills,
      };
      console.log("Sending data", data);

      axios
        .get(
          "https://api.github.com/repos/" +
            this.username +
            "/" +
            this.repo +
            "/" +
            "languages"
        )
        .then(function (response) {
          let languages = response.data;

          let proficient_string = "The user is proficient in: ";

          for (let lang in languages) {
            console.log(typeof lang);

            if (data.skills.includes(lang) && languages[lang] > 1000) {
              proficient_string += lang + ",";
            }
          }

          window.alert(proficient_string);
        });
      // .catch(function (error)
      // {
      //   console.log(error);
      // });

      // axios.get('//home/repo', data).then((res)=>{
      //     console.log("Sending data", res

      //     )
      // })
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 350px;
}

.bgCheker {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 30px;
}
.v-card {
  padding: 20px;
}
</style>