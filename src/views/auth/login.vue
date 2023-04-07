<template>
  <div class="home">
  

        <div class="homepage">
            <div class="text-h2">Background Buddy</div>
            <div class="text-h6">No more faking, get BackgroundBuddy checking</div>

            <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_zubt1ixr.json"  background="transparent"  speed="1"  style="width: 500px; height: 400px;"  loop autoplay></lottie-player>
        <div class="btn">
            <v-btn
                          color="warning"
                          dark
                          @click="pushRoute()"
                          to="/bgchecker"
                        >
                          Conduct a background check
                        </v-btn>
            </div>
        </div>
    
  </div>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        pushRoute(){
            this.$router.push('/bgchecker')
        }
    }


    
}
</script>

<style scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.btn{
width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>