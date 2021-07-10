<template>
  <div class="container">
    <h1 class="title">Season Matches</h1>
    <div class="season-matches">
      <button class="btn btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
        Change between Past and Future matches
      </button>
        <div id="past" class="match-prev" v-if="display_flag && pastReady">
          <h2> Past Matches </h2>
        <table-match-past-preview :pastLeagueMatches="seasonPastMatches"></table-match-past-preview >
        </div>
        <div id="future" class="match-prev" v-if="!display_flag && futureReady">
          <h2> Future Matches </h2>
        <table-match-future-preview :futureLeagueMatches="seasonFutureMatches" :favMatches="favMatches"></table-match-future-preview>
        </div>
    </div>
  </div>
</template>

<script>
import TableMatchPastPreview from "../components/TableMatchPastPreview.vue"
import TableMatchFuturePreview from "../components/TableMatchFuturePreview.vue"
export default {
    components:
    {
        TableMatchPastPreview,
        TableMatchFuturePreview
    },
    data(){
      return{
        display_flag:true,
        seasonPastMatches:[],
        seasonFutureMatches:[],
        favMatches:[],
        futureReady: false,
        pastReady: false
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
          
          this.futureReady = true;
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
          this.pastReady = true;
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
