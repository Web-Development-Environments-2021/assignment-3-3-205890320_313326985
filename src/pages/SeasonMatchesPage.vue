<template>
  <div class="container">
    <h1 class="title">Season Matches</h1>
    <!-- <login-page v-if="!$root.store.username"></login-page> -->
    <div class="season-matches">
      <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
        Change between Past and Future matches
      </button>
        <div id="past" class="match-prev" v-if="display_flag">
          <h2> Past Matches </h2>
        <table-match-past-preview :pastLeagueMatches="seasonPastMatches"></table-match-past-preview >
        </div>
        <div id="future" class="match-prev" v-if="!display_flag">
          <h2> Future Matches </h2>
        <table-match-future-preview :futureLeagueMatches="seasonFutureMatches" :favMatches="favMatches"></table-match-future-preview>
        </div>
    </div>
  </div>
</template>

<script>
import TableMatchPastPreview from "../components/TableMatchPastPreview.vue"
import TableMatchFuturePreview from "../components/TableMatchFuturePreview.vue"
// import LoginPage from "../pages/LoginPage";
export default {
    components:
    {
        TableMatchPastPreview,
        TableMatchFuturePreview
        // LoginPage
    },
    data(){
      return{
        display_flag:true,
        seasonPastMatches:[],
        seasonFutureMatches:[],
        favMatches:[]
      }
    },
    methods:{
      async updateFutureMatches(){
        try {

          // first, load fav matches for adding button
          await this.getFavoriteMatches();

          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            "http://localhost:3000/matches/futureMatches"
          );
          this.axios.defaults.withCredentials = false;
          const matches = response.data
          this.seasonFutureMatches=[];
          this.seasonFutureMatches.push(...matches);
        } catch (error) {
          console.log("error in update matches")
          console.log(error);
        }
      },
      async getFavoriteMatches(){
        try {
          this.axios.defaults.withCredentials = true;
          const futureMatches = await this.axios.get(
            "http://localhost:3000/users/favoriteMatches",
          );
          this.axios.defaults.withCredentials = false;
          this.favMatches=[];
          this.favMatches.push(...(futureMatches.data));
        } catch (error) {
          console.log("error in update favorite matches")
          console.log(error);
        }
      },
      async updatePastMatches(){
        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            "http://localhost:3000/matches/pastMatches"
          );
          this.axios.defaults.withCredentials = false;
          const matches = response.data;
          this.seasonPastMatches=[];
          this.seasonPastMatches.push(...matches);
        } catch (error) {
          console.log("error in update matches")
          console.log(error);
        }
      }
    },
    async mounted() {
      await this.updatePastMatches();
      await this.updateFutureMatches();
    },
};
</script>

<style>

</style>
