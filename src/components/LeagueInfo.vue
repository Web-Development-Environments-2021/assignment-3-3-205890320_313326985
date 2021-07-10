<template>
<div v-if="dataReady">
  <div class="matches-preview" v-if="$root.store.username && this.checkIfConnected()">
  <h2> Your Favorite Matches: </h2>
  <favorite-matches :matches="favoriteMatches"></favorite-matches>
  </div>
  <div class="not-connected-league-data">
  <div class="league-preview">
    <b-card
    img-alt="Image"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-title>{{leagueName}}</b-card-title>
    <b-card-text>
      Season: {{ season }}
      <br/>
      Stage: {{ stage }}
      <br/>
    </b-card-text>
  </b-card>
  </div>
  <div class="next-match-preview">
    <div class="next-match-title">
    <b>Next match planned:</b>
    <br/>
    <b style="color:rgb(111, 197, 157);"> {{ next_match_planned.local_team_name }} - {{ next_match_planned.visitor_team_name }} </b>

    </div>
    <ul class="next-match-content">
      <li> Date And Time: {{ next_match_planned.date_time }}</li>
      <li> Venue Name: {{next_match_planned.venue_name}}</li>
    </ul>
  </div>
  </div>


</div>
</template>

<script>
import FavoriteMatches from "./FavoriteMatches.vue";
export default {
 name: "LeagueInfo",
 components: {
    FavoriteMatches
 },
 data() {
    return {
      leagueName:"", 
      season: "", 
      stage: "",
      next_match_planned : [],
      favoriteMatches:[],
      dataReady: false,
      connected: false,
      gotIn: false
    };
  },
  methods: {
    async updateLeagueDetailsAndNextMatchPlanned(){
      try {
        this.axios.defaults.withCredentials = true;
        var response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        this.axios.defaults.withCredentials = false;

        var leagueDetails = response.data.leaguePreview;
        var NextMatchPlanned = leagueDetails.next_match_planned;

        this.leagueName = leagueDetails.league_name || "None";
        this.season = leagueDetails.current_season_name || "None";
        this.stage = leagueDetails.current_stage_name || "-";

        this.next_match_planned = NextMatchPlanned || "No future matches"

      } catch (error) {
        console.log("error in update league info")
        console.log(error);
      }
    },
    async updateFavoriteMatchesforLeagueInfo(){
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        this.axios.defaults.withCredentials = false;
        
        var favMatches = response.data.favoriteMatches;

        this.favoriteMatches.push(...favMatches)

      } catch (error) {
        console.log("error in update favorite matches for league info")
        console.log(error);
      }
    },
    async checkIfConnected(){
      if(!(this.gotIn)){
        this.gotIn = true;
        if(this.$root.store.username && (!this.connected)){
          await this.updateFavoriteMatchesforLeagueInfo();
          this.connected = true;   
          return true;
        }
        return false;     
      }
    }
  },
  async mounted(){
    if(this.$root.store.username){
      this.connected = true;
      await this.updateFavoriteMatchesforLeagueInfo();
    }
    await this.updateLeagueDetailsAndNextMatchPlanned();
    this.dataReady = true;
  }
}
</script>

<style>
.matches-preview{
  float:right;
  width: 50%;
}
.not-connected-league-data{
  float:left;
  width: 50%;
}

.league-preview {
  float:left;
  width: 250px;
  height: 200px;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

.next-match-preview {
  width: 315px;
  height: 150px;
  float:left;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.next-match-preview .next-match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(80, 11, 230);
}

.next-match-preview .next-match-content {
  width: 100%;
  overflow: hidden;
}


</style>