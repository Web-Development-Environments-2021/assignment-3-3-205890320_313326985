<template>
  <div class="container">
    <h1 class="title">Season Matches</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <div class="season-matches" v-else>
      <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
        Change between Past and Future matches
      </button>
        <div id="past" class="match-prev" v-if="display_flag">
          <h2> Past Matches </h2>
        <season-past-preview></season-past-preview >
        </div>
        <div id="future" class="match-prev" v-if="!display_flag">
          <h2> Future Matches </h2>
        <season-future-preview></season-future-preview >
        </div>
    </div>
  </div>
</template>

<script>
import SeasonPastPreview from "../components/SeasonPastPreview";
import SeasonFuturePreview from "../components/SeasonFuturePreview";
import LoginPage from "../pages/LoginPage";
export default {
    components:
    {
        SeasonPastPreview,
        SeasonFuturePreview,
        LoginPage
    },
    data(){
      return{
        display_flag:true
      }
    },
    methods:{
      async updatePastMatches(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/matches/pastMatches"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const matches = response.data;
        this.leagueMatches = [];
        console.log(matches);
        this.leagueMatches.push(...matches);
        console.log(this.leagueMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    async updateFutureMatches(){
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/matches/futureMatches"
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.leagueMatches = [];
        this.leagueMatches.push(...matches);
        console.log(this.leagueMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    }
};
</script>

<style>

</style>
