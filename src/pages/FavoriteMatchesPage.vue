<template>
  <div class="container">
    <h1 class="title" style="color:black;">Favorite Matches Page</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <favorite-matches v-else-if="$root.store.username && dataReady" :matches="favMatches"></favorite-matches>
    <div v-else>
      <div class="box">
      <div class="shadow"></div>
      <div class="gravity">
      <div class="ball"></div>
    </div>
</div>
</div>
  </div>
</template>

<script>
import FavoriteMatches from "../components/FavoriteMatches";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LoginPage, 
    FavoriteMatches
  },
  data(){
    return{
      favMatches:[],
      dataReady: false
    }
  },
  methods:{
    async updateFavoriteMatches(){
      try {
        this.dataReady = false;
        this.axios.defaults.withCredentials = true;
        const futureMatches = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        this.axios.defaults.withCredentials = false;
        this.favMatches.push(...(futureMatches.data));
        this.dataReady = true;
      } catch (error) {
        console.log("error in update favorite matches")
        console.log(error);
      }
    }
  },
  async mounted(){
    await this.updateFavoriteMatches();
  }
};
</script>

<style lang="scss" scoped>






.box {
  margin: 0 auto;
  padding-bottom: 50px;
  width: 150px;
  height: 245px;
  position: relative;
}
.shadow {
  position: absolute;
  width: 100%;
  height: 10px;
  background-color: grey;
  bottom: 0;
  border-radius: 100%;
  transform: scaleX(.8);
  opacity: .6;
  animation: shadowScale 1s linear infinite;
}

.gravity {
  width: 40px;
  height: 40px;
  animation: bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite;
}
.ball {
  width: 150px;
  height: 150px;
  background-image: url('https://image.flaticon.com/icons/svg/33/33736.svg');
  background-size: cover;
  animation: roll .6s linear infinite;
}

@keyframes roll {
  0% {}
  100% { transform: rotate(360deg) }
}
@keyframes bounce {
  0% {}
  50% { transform: translateY(100px) }
  100% {}
}
@keyframes shadowScale {
  0% {}
  50% { transform: scaleX(1); opacity: .8;}
  100% {}
}
</style>
