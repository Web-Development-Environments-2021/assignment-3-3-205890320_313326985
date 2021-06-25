<template>
<div>
  <div class="matches-preview" v-if="$root.store.username">
  <favorite-matches-for-league-info></favorite-matches-for-league-info>
  </div>
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
    </div>
    <ul class="next-match-content">
      <li> Match Id: {{next_match_planned.match_id}}</li>
      <li> Date And Time: {{ next_match_planned.date_time }}</li>
      <li> Local Team Id: {{ next_match_planned.local_team_id }}</li>
      <li> Local Team Name: {{ next_match_planned.local_team_name }}</li>
      <li> Visitor Team Id: {{ next_match_planned.visitor_team_id }}</li>
      <li> Visitor Team Name: {{ next_match_planned.visitor_team_name }}</li>
      <li> Venue Id: {{next_match_planned.venue_id}}</li>
      <li> Venue Name: {{next_match_planned.venue_name}}</li>
      <li> Referee Id: {{next_match_planned.referee_id}}</li>
    </ul>
    </div>
</div>
</template>

<script>
import FavoriteMatchesForLeagueInfo from "./FavoriteMatchesForLeagueInfo.vue";
export default {
 name: "LeagueInfo",
 components: {
    FavoriteMatchesForLeagueInfo
 },
 async mounted(){
    console.log("mounted");
    await this.updateLeagueDetailsAndNextMatchPlanned(); 
    console.log("league details updated");
 },
 data() {
    return {
      leagueName:this.leagueName , 
      season: this.season, 
      stage: this.stage,
      next_match_planned : this.next_match_planned
    };
  },
  methods: {
    async updateLeagueDetailsAndNextMatchPlanned(){
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        this.axios.defaults.withCredentials = false;

        const leagueDetails = response.data.leaguePreview;
        const NextMatchPlanned = leagueDetails.next_match_planned;

        this.leagueName = leagueDetails.league_name;
        this.season = leagueDetails.current_season_name;
        this.stage = leagueDetails.current_stage_name || "None";

        this.next_match_planned = NextMatchPlanned || "No future matches"

      } catch (error) {
        console.log("error in update league info")
        console.log(error);
      }
    }
  }
  
}
</script>

<style>
.matches-preview{
  float:right;
}

.league-preview {
  /* float:left; */
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
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
  display: inline-block;
  width: 250px;
  height: 300px;
  position: relative;
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