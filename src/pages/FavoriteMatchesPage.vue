<template>
  <div class="container">
    <h1 class="title">Favorite Matches Page</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <favorite-matches v-else :matches="favMatches"></favorite-matches>
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
      favMatches:[]
    }
  },
  methods:{
    async updateFavoriteMatches(){
      try {
        this.axios.defaults.withCredentials = true;
        const futureMatches = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        this.axios.defaults.withCredentials = false;
        this.favMatches.push(...(futureMatches.data));
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
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep {
  pointer-events: none;
  cursor: default;
}
</style>
