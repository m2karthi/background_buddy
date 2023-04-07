<template>
  <div class="bgCheker">
    
    <div class="cont">
      <h1>Want To prove you're Plagarism free</h1>
    <v-card width="550px" class="   ">
        <v-form @submit.prevent="sendData">
             <v-text-field
                v-model="email"
                label="Email"
                solo
                clearable
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="repo"
                solo
                label="GitHub repo link"
                required
                clearable
              ></v-text-field>
              <v-autocomplete
                chips
                :items= items
                clearable
                deletable-chips
                multiple
                small-chips
                v-model="skills"
                solo
                lable="Select Skills"
                required
                ></v-autocomplete>
                 <v-btn
                          color="warning"
                          dark
                          type="submit"
                        >
                          Conduct a background check
                        </v-btn>
        </v-form>
    </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'plagarism',
    data(){
        return{
            skills: null,
            email: "",
            repo: "",
            items: ["C++", "Java", "Javascript", "Python", "DBMS", "Solidity", "Rust"],

        }
    },
    methods: {
        sendData(){
            var data = {
                email: this.email,
                repo: this.repo,
                skills: this.skills
            }
            console.log("Sending data", data)
            axios.get('//home/repo', data).then((res)=>{
                console.log("Sending data", res
                
                )
            })
        }
    }

}
</script>

<style scoped>
.v-text-field{
    width: 350px;
}

.bgCheker{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;height: 100%;
    margin-top: 30px;
}
.v-card{
    padding: 20px;
}

</style>