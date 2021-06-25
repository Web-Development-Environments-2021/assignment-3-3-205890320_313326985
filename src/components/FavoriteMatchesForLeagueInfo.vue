<template>
  <div>
    <future-match-preview
      v-for="m in matches"
        :match_id="m[0].match_id"
        :date_time="(m[0].date_time.replace('T',' ').replace('Z',' ')).substr(0,19)" 
        :local_team_id="m[0].local_team_id"
        :local_team_name="m[0].local_team_name"
        :visitor_team_id="m[0].visitor_team_id"
        :visitor_team_name ="m[0].visitor_team_name"
        :venue_id="m[0].venue_id"
        :venue_name ="m[0].venue_name"
        :referee_id ="m[0].referee_id"
      :key="m[0].match_id">
      </future-match-preview>
  </div>
</template>

<script>
import FutureMatchPreview from "./FutureMatchPreview.vue";
export default {
  name: "FavoriteMatchesForLeagueInfo",
  components: {
    FutureMatchPreview
  }, 
  data() {
    return {
      matches:[]
    };
  },
  methods: {
    async updateFavoriteMatchesforLeagueInfo(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        this.axios.defaults.withCredentials = false;
        
        const favoriteMatchesPreview = response.data.favoriteMatches;

        this.matches = [];
        this.matches.push(...favoriteMatchesPreview)

      } catch (error) {
        console.log("error in update favorite matches for league info")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateFavoriteMatchesforLeagueInfo(); 
  }
};
</script>

<style></style>
