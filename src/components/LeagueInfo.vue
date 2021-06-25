<template>
<div>
  <div class="matches-preview">
  <favorite-matches-for-league-info v-bind = matches></favorite-matches-for-league-info>
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
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
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
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        this.axios.defaults.withCredentials = false;

        console.log(response.data.leaguePreview);
        console.log(response.data.leaguePreview.next_match_planned);
        console.log(response.data.favoriteMatches);
        
        const leagueDetails = response.data.leaguePreview;
        const NextMatchPlanned = leagueDetails.next_match_planned;
        const favoriteMatchesPreview = response.data.favoriteMatches;

        this.matches = [];
        this.matches.push(favoriteMatchesPreview)

        this.leagueName = leagueDetails.league_name;
        this.season = leagueDetails.current_season_name;
        this.stage = leagueDetails.current_stage_name;

        this.next_match_planned = NextMatchPlanned

      } catch (error) {
        console.log("error in update league info")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateLeagueDetailsAndNextMatchPlanned(); 
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

</style>