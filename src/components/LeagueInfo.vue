<template>
<div>
<div v-if="dataReady">
  <div class="matches-preview" v-if="$root.store.username && this.checkIfConnected()">
  <h1 class="w3-xxlarge w3-text-black" style="padding-bottom: 25px;"><b>Your Favorite Matches</b></h1>
  <favorite-matches :matches="favoriteMatches"></favorite-matches>
  </div>
  <div class="not-connected-league-data">
  <div class="league-previeww">
   <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <div class="w3-display-top w3-margin-top w3-left">
        <h1 class="w3-xxlarge w3-text-white" style="padding-bottom: 25px;"><span class="w3-padding w3-black w3-opacity-min"><b>{{leagueName}}</b></span></h1>
        <h1 class="w3-xxlarge w3-text-black" style="padding-bottom: 25px;"><b>{{ season }}</b></h1>
        <h1 class="w3-xxlarge w3-text-black" style="padding-bottom: 25px;"><b>{{ stage }}</b></h1>
      </div>
  </div>
  <div class="next-match-preview w3-padding w3-black w3-opacity-min">
    <div class="next-match-title">
    <b>Next match planned:</b>
    <br/>
    <b style="color:rgb(111, 197, 157);"> {{ next_match_planned.local_team_name }} - {{ next_match_planned.visitor_team_name }} </b>

    </div>
    <br>
    <div class="next-match-content" style="text-align: center;">
      <b> {{ next_match_planned.date_time }}</b>
      <br>
      <b> {{next_match_planned.venue_name}}</b>
    </div>
  </div>
  </div>

</div>
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
        this.stage = leagueDetails.current_stage_name || "No Stages At This Time";

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