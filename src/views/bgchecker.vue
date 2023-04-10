<template>
  <div class="bgCheker">
    
    <div class="cont">
      <h2 class="mb-3">Want to generate a proof of your contribution?</h2>
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
              <!-- <v-autocomplete
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
                ></v-autocomplete> -->
                 <v-btn
                          color="warning"
                          dark
                          type="submit"
                        >
                          Check contribution
                        </v-btn>
        </v-form>
    </v-card>
    <v-dialog
     v-model="dialog"
      width="500">

      <v-card v-if="url!=null">
        <h3>Scan the QR to Claim Your Proof!</h3>
        <!-- <a>{{ url }}</a> -->
            <img
      width="300"
      aspect-ratio="16/9"
      cover
      src="../assets/qr.jpg"
    />
      </v-card>
    </v-dialog>
    </div>
  </div>
</template>

<script allowjs="true">
import axios from "axios"
// import VueQrcode from 'vue-qrcode'
// import { Reclaim } from "@reclaimprotocol/reclaim-sdk/dist";

// import {isAxiosError} from 'axios'
export default {
    name: 'BackgroundChecker',
     components: {
    // VueQrcode,
  },
    data(){
        return{
          dialog: false,
            skills: null,
            email: "",
            repo: "",
            items: ["C++", "Java", "Javascript", "Python", "DBMS", "Solidity", "Rust"],
          url: null,
          callbackId: null,
        }
    },
    methods: {

  //     extractGithubRequest(url){
  //       const match = url.match(
	// 	/^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
	// )
	// if (!match || !(match.groups?.owner && match.groups?.name)) return null
	// return `${match.groups.owner}/${match.groups.name}`
  //     },

  //     handleError(error){
  //       if (isAxiosError(error) || error instanceof Error) {
	// 	return error.message
	// }
	// return 
  //     },
  onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl
    },

        async sendData(){
          // const repoFullName= extractGithubRequest()
          // const callbackUrl = "http://localhost:8081/bgchecker" + '/callback/'
          // const reclaim = new Reclaim(callbackUrl)

            var data = {
                email: this.email,
                repo: this.repo,
               
            }
            console.log("data",data)
            //  const user = auth.currentUser;
    // const connection = reclaim.connect(
    //     'Github-contributor',
    //     [
    //       {
    //         provider: 'github-contributor',
    //         params: {
    //             repo:this.repo
    //         }
    //       }
    //     ]
    //   )

    //   const callbackId = this.repo.split("/")[1]+"@"+ this.email;
    //   const template = (await connection).generateTemplate(callbackId)
      
    //   const uri = template.url
    //     console.log(uri,callbackId)
    //   const templateId = template.id
    //   console.log("Template id: " + templateId)
    //   // addRepo(repoName)
    //   return { uri, callbackId }



            var strdata= JSON.stringify(data)
            console.log("Sending data", strdata)
            await axios.post('https://backendeth.onrender.com/home/repo', data).then((res)=>{
                console.log("Sending data", res)
                 this.callbackId= res.data.callbackId
                 this.url= res.data.url
                 this.dialog= true
            }).catch((err)=>{
              console.error("Sending err", err)
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
/* 
.link{ 
  width: 350px;
  height: auto;
} */

</style>